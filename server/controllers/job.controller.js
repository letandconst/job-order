const Job = require('../models/job.model');
const Mechanic = require('../models/mechanic.model');
const Products = require('../models/product.model');

exports.addJobOrder = async (req, res) => {
	try {
		const { customerName, address, carModel, plateNumber, mobileNumber, date, assignedMechanic, products, workRequested, status } = req.body;

		const mechanicDoc = await Mechanic.findById(assignedMechanic);

		if (!mechanicDoc) {
			return res.status(404).json({ message: 'Mechanic not found' });
		}

		// Calculate Total Labor
		let totalLabor = 0;
		for (const request of workRequested) {
			totalLabor += request.labor;
		}

		let totalProductPrice = 0;
		for (const product of products) {
			const productDoc = await Products.findById(product.ProductID);
			if (productDoc) {
				totalProductPrice += productDoc.price * product.Quantity;
			}
		}

		// Calculate Total Price
		const totalPrice = totalLabor + totalProductPrice;

		const jobData = {
			customerName,
			address,
			carModel,
			plateNumber,
			mobileNumber,
			date,
			assignedMechanic: mechanicDoc,
			products,
			totalLabor,
			workRequested,
			totalProductPrice: totalProductPrice,
			totalPrice,
			status,
		};

		// Create the job order
		const job = await Job.create(jobData);

		mechanicDoc.totalJobs = (mechanicDoc.totalJobs || 0) + 1;
		await mechanicDoc.save();

		res.status(201).json(job);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateJobOrder = async (req, res) => {
	try {
		const jobId = req.params.id;
		const newStatus = req.body.status;

		const jobToUpdate = await Job.findById(jobId).populate('products.ProductID');

		if (!jobToUpdate) {
			return res.status(404).json({ message: 'Job not found' });
		}

		if ((jobToUpdate.status === 'Pending' && newStatus === 'In Progress') || (jobToUpdate.status === 'Pending' && newStatus === 'Completed')) {
			jobToUpdate.status = newStatus;

			// Deduct product stockQuantity
			for (const product of jobToUpdate.products) {
				const productDoc = await Products.findById(product.ProductID);
				if (productDoc && productDoc.stockQuantity != null) {
					productDoc.stockQuantity -= product.Quantity;
					await productDoc.save();
				}
			}
		}

		// Update other fields
		if (req.body.assignedMechanic) {
			// Retrieve mechanic document
			const mechanicDoc = await Mechanic.findById(req.body.assignedMechanic);
			if (!mechanicDoc) {
				return res.status(404).json({ message: 'Mechanic not found' });
			}
			jobToUpdate.assignedMechanic = mechanicDoc;
		}

		if (req.body.products) {
			jobToUpdate.products = req.body.products;

			// Recalculate totalProductPrice based on updated products
			let totalProductPrice = 0;
			for (const product of jobToUpdate.products) {
				const productDoc = await Products.findById(product.ProductID);
				if (productDoc) {
					totalProductPrice += productDoc.price * product.Quantity;
				}
			}
			jobToUpdate.totalProductPrice = totalProductPrice;
		}

		if (req.body.workRequested) {
			jobToUpdate.workRequested = req.body.workRequested;

			// Recalculate total labor based on updated workRequested
			const totalLabor = req.body.workRequested.reduce((total, request) => total + request.labor, 0);
			jobToUpdate.totalLabor = totalLabor;
		}

		// Update status
		jobToUpdate.status = newStatus;

		// Recalculate total price
		jobToUpdate.totalPrice = jobToUpdate.totalLabor + jobToUpdate.totalProductPrice;

		await jobToUpdate.save();
		res.json(jobToUpdate);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteJobOrder = async (req, res) => {
	try {
		const jobId = req.params.id;
		const deletedJob = await Job.findByIdAndDelete(jobId);

		if (!deletedJob) {
			return res.status(404).json({ message: 'Job not found' });
		}

		res.json({ message: 'Job deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getJobOrder = async (req, res) => {
	try {
		const jobId = req.params.id;
		const job = await Job.findById(jobId);

		if (!job) {
			return res.status(404).json({ message: 'Job not found' });
		}

		res.json(job);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getAllJobOrder = async (req, res) => {
	try {
		const jobs = await Job.find();
		res.json(jobs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
