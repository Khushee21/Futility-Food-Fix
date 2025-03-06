const Student = require("../models/Student");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Occasional = require("../models/Occasional");

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Student Registration
exports.registerStudent = async (req, res) => {
    try {
        const { id, name, degree, email, parentEmail, password } = req.body;

        // Check if all required fields are provided
        if (!id || !name || !degree || !email || !parentEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (ID, Name, Degree, Email, Parent Email, Password) are required",
            });
        }

        // Check if the ID and Email exist in the 'users' collection (Admission Database)
        const existingUser = await User.findOne({ id, email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "ID and Email must match an existing user in the system.",
            });
        }

        // Check if student already exists in the 'students' collection
        const existingStudent = await Student.findOne({ $or: [{ email }, { id }] });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Student with this ID or Email already exists.",
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store the hashed password and other details
        const newStudent = new Student({
            id,
            name,
            degree,
            email,
            parentEmail,
            password: hashedPassword,
        });

        // Save the student to the database
        const savedStudent = await newStudent.save();
        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student: savedStudent,
        });
    } catch (error) {
        console.error("❌ Error in registration:", error);
        res.status(500).json({
            success: false,
            message: "Error registering student",
        });
    }
};

// Student Login
exports.login = async (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.status(400).json({
            success: false,
            message: "ID and Password are required",
        });
    }

    try {
        const student = await Student.findOne({ id });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Return success response with studentId
        res.status(200).json({
            success: true,
            message: "Login successful",
            studentId: student.id, // Return the student ID
        });
    } catch (err) {
        console.error("❌ Error in login:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Admin Login (Static data for warden)
exports.adminLogin = (req, res) => {
    const { username, password } = req.body;
    const validUsername = "wardensangam";
    const validPassword = "123456";

    if (username === validUsername && password === validPassword) {
        return res.json({ success: true, message: "Admin login successful" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }
};

// Request OTP for Password Reset
exports.requestOtp = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    try {
        const student = await Student.findOne({ id });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (!student.email) {
            return res.status(400).json({ success: false, message: "No email associated with this student" });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        student.otp = otp;
        student.otpExpires = otpExpires;
        await student.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("❌ Error sending email:", error);
                return res.status(500).json({ success: false, message: "Error sending OTP email" });
            } else {
                console.log("✅ Email sent:", info.response);
                return res.json({ success: true, message: "OTP sent to your registered email" });
            }
        });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { id, otp } = req.body;

    if (!id || !otp) {
        return res.status(400).json({ success: false, message: "Student ID and OTP are required" });
    }

    try {
        const student = await Student.findOne({ id });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (student.otp !== otp || student.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        return res.json({ success: true, message: "OTP verified successfully" });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { id, otp, newPassword } = req.body;

    if (!id || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "ID, OTP, and new password are required" });
    }

    try {
        const student = await Student.findOne({ id });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (student.otp !== otp || student.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        student.password = hashedPassword;
        student.otp = undefined;
        student.otpExpires = undefined;
        await student.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Create Occasional Data
exports.createOccasional = async (req, res) => {
    try {
        const newOccasion = new Occasional(req.body);
        await newOccasion.save();
        console.log("✅ Occasion created successfully");
        res.status(201).json({ message: "Occasion created successfully" });
    } catch (error) {
        console.error("❌ Failed to create occasion:", error);
        res.status(500).json({ error: "Failed to create occasion" });
    }
};

// Vote for Menu
exports.voteMenu = async (req, res) => {
    const { occasionId, menuNumber } = req.body;
    try {
        const occasion = await Occasional.findById(occasionId);
        if (menuNumber === 1) {
            occasion.menu1.votes += 1;
        } else if (menuNumber === 2) {
            occasion.menu2.votes += 1;
        }
        await occasion.save();
        console.log("✅ Vote recorded successfully");
        res.status(200).json({ message: "Vote recorded successfully" });
    } catch (error) {
        console.error("❌ Failed to record vote:", error);
        res.status(500).json({ error: "Failed to record vote" });
    }
};

// Get Winning Meal
exports.getResults = async (req, res) => {
    try {
        const occasion = await Occasional.find().sort({ date: -1 }).limit(1);
        const menu1Votes = occasion[0].menu1.votes;
        const menu2Votes = occasion[0].menu2.votes;
        const winner = menu1Votes > menu2Votes ? "Menu 1" : "Menu 2";
        console.log("🏆 Winning Menu:", winner);
        res.status(200).json({ winner });
    } catch (error) {
        console.error("❌ Failed to fetch results:", error);
        res.status(500).json({ error: "Failed to fetch results" });
    }
};

// Notify Students
exports.notifyStudents = async (req, res) => {
    try {
        const students = await Student.find();
        const studentEmails = students.map((student) => student.email);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: studentEmails,
            subject: "Special Occasion Meal Voting",
            text: "Please participate in voting for the special occasion meal!",
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Notification emails sent successfully");
        res.status(200).json({ message: "Notification emails sent successfully" });
    } catch (error) {
        console.error("❌ Failed to send notifications:", error);
        res.status(500).json({ error: "Failed to send notifications" });
    }
};