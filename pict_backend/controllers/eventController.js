const Event = require("../models/Event");
const path = require("path");
const { ObjectID } = require("mongodb");
const User = require("../models/User");
const fs = require("fs");
const jimp = require("jimp");

exports.addEvent = async function (req, res) {
  try {
    let multipleNames = [];
    if (req.files) {
      if (req.files.eventAttachment) {
        console.log(req.files);
        if (Array.isArray(req.files.eventAttachment)) {
          let files = req.files.eventAttachment;
          // console.log(files);
          const promises = files.map((file) => {
            const fileName = new Date().getTime().toString() + "-" + file.name;
            const savePath = path.join(
              __dirname,
              "../public/",
              "eventAttachments",
              fileName
            );
            multipleNames.push(fileName);
            return file.mv(savePath);
          });
          await Promise.all(promises);
          req.body.eventAttachment = multipleNames;
        } else if (!Array.isArray(req.files)) {
          let file = req.files.eventAttachment;
          const fileName = new Date().getTime().toString() + "-" + file.name;
          const savePath = path.join(
            __dirname,
            "../public/",
            "eventAttachments",
            fileName
          );
          await file.mv(savePath);
          req.body.eventAttachment = fileName;
        }
      }

      if (req.files.eventPoster) {
        const poster = req.files.eventPoster;
        // console.log(logoFile.name);
        const fileName1 = new Date().getTime().toString() + "-" + poster.name;
        const savePath1 = path.join(
          __dirname,
          "../public/",
          "poster",
          fileName1
        );
        await poster.mv(savePath1);
        req.body.eventPoster = fileName1;
      }
    }

    let event = new Event(req.body);
    console.log(req.body);
    let result = await event.addEvent();

    // if (result == "ok") {
    //   return res.status(200).json({ message: "Event Added Successfully" });
    // }

    // Redirect to the home page and give the message as "Event Added Successfully"
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteEventById = async (req, res) => {
  try {
    console.log("Hit");

    let event = new Event();
    let result = await event.deleteEventById(req.params.eventId);

    // if (result == "ok") {
    //   return res.status(200).json({ message: "Event Deleted Successfully" });
    // }

    // Redirect to the home page and give the message "Event Deleted Successfully"
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllEvents();
    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllEvents();

    // Render the events list page
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getEventById(req.params.eventId);

    // Render the eventPage with all the details
  } catch (e) {
    console.log(e);
  }
};

exports.getSingleEventById = async (req, res) => {
  try {
    const { eventId } = req.body;

    let event = new Event();
    let result = await event.getEventById(eventId);

    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUpcomingEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllUpcomingEvents();

    // Render All Upcoming Events in datatable
  } catch (e) {
    console.log(e);
  }
};

exports.getAllUpcomingEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllUpcomingEvents();

    // Render All Upcoming Events in datatable
    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCompletedEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllCompletedEvents();

    // Render All Completed Events in datatable
  } catch (e) {
    console.log(e);
  }
};

exports.getAllCompletedEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllCompletedEvents();

    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOngoingEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllOngoingEvents();

    // Render All Ongoing Events in datatable
  } catch (e) {
    console.log(e);
  }
};

exports.getAllOngoingEvents = async (req, res) => {
  try {
    let event = new Event();
    let result = await event.getAllOngoingEvents();

    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.registerEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    let event = new Event();
    let user = new User();
    let result = await event.registerEvent(userId, eventId);

    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserEventRegistrationCountById = async (req, res) => {
  try {
    const { userId } = req.body;

    let event = new Event();
    let count = await event.getUserEventRegistrationCountById(userId);

    return res.status(200).json({ count });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserEventParticipationCountById = async (req, res) => {
  try {
    const { userId } = req.body;

    let event = new Event();
    let count = await event.getUserEventParticipationCountById(userId);

    return res.status(200).json({ count });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTotalEventsCount = async (req, res) => {
  try {
    let event = new Event();

    let count = await event.getTotalEventsCount();

    return res.json({ count });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllUpcomingEventsCount = async (req, res) => {
  try {
    let event = new Event();

    let count = await event.getAllUpcomingEventsCount();

    // This should be displayed on webapp dashboard in chart section
    // return res.json({ count });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllCompletedEventsCount = async (req, res) => {
  try {
    let event = new Event();

    let count = await event.getAllCompletedEventsCount();

    // This should be displayed on webapp dashboard in chart section
    // return res.json({ count });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllOngoingEventsCount = async (req, res) => {
  try {
    let event = new Event();

    let count = await event.getAllOngoingEventsCount();

    // This should be displayed on webapp dashboard in chart section

    // return res.json({ count });
  } catch (e) {
    console.log(e);
  }
};

exports.markPresent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    let event = new Event();
    let eventDoc = await event.getEventById(eventId);

    if (
      eventDoc.registeredParticipants.find(
        (current) => current.userId.toString() === userId
      )
    ) {
      // Means, The user has already registered in the event.
      if (
        !eventDoc.presentParticipants.find(
          (current) => current.userId.toString() === userId
        )
      ) {
        // Means, The user has registered in the event but not yet attended in the event.

        // Add the user, in the presentParticipants
        let result = await event.markPresent(userId, eventId);

        if (result == "ok") {
          return res
            .status(200)
            .json({ message: "Present Marked Successfully" });
        }
      } else {
        // Means, The user has already attended the event.
        return res.status(200).json({ message: "Already Present" });
      }
    } else {
      // Means, The user has not registered in the event.
      return res.status(200).json({ message: "Not Registered" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPresentParticipants = async (req, res) => {
  try {
    const { eventId } = req.body;

    let event = new Event();
    let result = await event.getPresentParticipants(eventId);

    // Show the present participants in the eventPage in the datatable and there should be button to generate certificate of the user
    // return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getRegisteredParticipants = async (req, res) => {
  try {
    const { eventId } = req.body;

    let event = new Event();
    let result = await event.getRegisteredParticipants(eventId);

    // Show the present participants in the eventPage in the datatable and there should be button to generate certificate of the user
    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.generateCertificate = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    let event = new Event();
    let user = new User();
    let userDoc = await user.getUserById(userId);

    // Marks the certificateReceived true in the presentParticipants in the user.
    await event.markCertificateReceived(userId, eventId);

    const fullName = `
        ${userDoc.userFirstName + " " + userDoc.userLastName}
      `;

    const image = await jimp.read(
      path.join(__dirname, "../public/images/certificate.png")
    );

    console.log("Hello image");
    console.log(image);

    const font = await jimp.loadFont(jimp.FONT_SANS_128_BLACK);

    image.print(font, 1000, 1200, fullName);
    // image.print(font, 250, 400, doc);
    // image.quality(100)
    image.resize(1920, 1080);

    await image.writeAsync(
      path.join(
        __dirname,
        `../public/certificates/certificate(${
          userDoc.userFirstName + " " + userDoc.userLastName
        }).png`
      )
    );

    // Flash the message as Certificate has been generated in the web app;
    return res.status(200).json({ message: "Certificate Generated" });
  } catch (e) {
    console.log(e);
    // return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkIfAlreadyRegistered = async function (req, res) {
  try {
    const { userId, eventId } = req.body;

    let event = new Event();
    let data = await event.checkIfAlreadyRegistered(userId, eventId);
    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};