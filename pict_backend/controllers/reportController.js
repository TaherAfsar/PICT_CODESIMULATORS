let Report = require("../models/Report");
let User = require("../models/User");
let path = require("path");
exports.addReport = async (req, res) => {
    try {
        if (req.files.reportAttachment) {
            const reportAttachment = req.files.reportAttachment;
            // console.log(logoFile.name);
            const fileName1 = new Date().getTime().toString() + "-" + reportAttachment.name;
            const savePath1 = path.join(
                __dirname,
                "../public/",
                "reportAttachments",
                fileName1
            );
            await reportAttachment.mv(savePath1);
            req.body.reportAttachment = fileName1;
        }
        let user = new User();
        let userData = await user.getUserById(req.body.uploaderId);
        req.body.uploaderEmail = userData.userEmail;
        req.body.uploaderName = userData.userFirstName + " " + userData.userLastName;
        let data = req.body;
        console.log(data);
        let report = new Report(data);
        let response = await report.addReport();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getAllReports = async (req, res) => {
    try {
        let report = new Report();
        let reports = await report.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

exports.getReportById = async (req, res) => {
    try {
        let reportId = req.params.reportId;
        let report = new Report();
        let response = await report.getReportById(reportId);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

exports.changeReportStatus = async (req, res) => {
    try {
        let { reportId, reportStatus } = req.body;
        console.log(req.body);
        let report = new Report();
        let response = await report.changeReportStatus(reportId, reportStatus);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

exports.getReportsByStatus = async (req, res) => {
    try {
        let report = new Report();
        let reportStatus = req.params.reportStatus;
        let fetchedReports = await report.getReportsByStatus(reportStatus);
        res.status(200).json(fetchedReports);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}