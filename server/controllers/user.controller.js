const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.register = async (req, res) => {
	try {
		const { fullName, username, email, password } = req.body;

		if (!fullName || !username || !email || !password) {
			return res.status(400).json({ error: 'All fields are required ⚠' });
		}

		if (password.length < 8) {
			return res.status(400).json({ error: 'Password must be at least 8 characters' });
		}

		const emailFormat = /^\S+@\S+\.\S+$/;
		if (!emailFormat.test(email)) {
			return res.status(400).json({ error: 'Invalid email address' });
		}

		const findUser = await User.findOne({ username });
		if (findUser)
			return res.status(400).json({
				message: 'Username already exists! 🚫',
			});

		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);
		const user = new User({
			fullName,
			username,
			email,
			password: passwordHash,
			createdAt: new Date().toISOString(),
		});

		await user.save();

		res.json({
			message: 'User registered successfully ✔',
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if ((username == '' && password == '') || !user) {
			return res.status(400).json({ msg: 'Invalid username or password' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid username or password' });

		res.json({ msg: 'Login Success!' });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

exports.reset_password = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		await User.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true });

		res.json({ msg: 'Password successfully updated!' });
	} catch (error) {
		return res.status(500).json({ msg: err.message });
	}
};

exports.delete = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ msg: 'User has been deleted!' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
