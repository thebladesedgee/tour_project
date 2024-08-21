const express = require("express");
const { createConnection } = require("typeorm");
const cors = require("cors");
//config File
const ormconfig = require("./App/config/config");
//MODELS
const Customer = require("./App/models/CustomerManagement/CustomersModel");
//--
const Tahsilat = require("./App/models/Accounting/tahsilatModel");
//--
const AdminUser = require("./App/models/GeneralSettings/AdminUsersModel");
const AgencyModel = require("./App/models/GeneralSettings/AgencyMode");
const CompanyInfos = require("./App/models/GeneralSettings/companyInformation");
const SocialMedia = require("./App/models/GeneralSettings/socialMediaModel");
//--
const Inbox = require("./App/models/Inbox/inboxModel");
//--
const Offers = require("./App/models/Offers/OfferModel");
//--
const OteherService = require("./App/models/OtherServices/OtherServiceModel");
//--
const SaleReport = require("./App/models/Reporting/SalesReportModel");
//--
const Partipant = require("./App/models/Reservations/participantModel");
const Rezervation = require("./App/models/Reservations/RezervationModel");
//--
const TourCategory = require("./App/models/ToursAndActivities/TourCategoriesModel");
const Tour = require("./App/models/ToursAndActivities/TourModel");
const TourDetail = require("./App/models/ToursAndActivities/TourDetailModel");
const TourExtension = require("./App/models/ToursAndActivities/TourExtensionModel");
const TourGallery = require("./App/models/ToursAndActivities/TourGallery");
const TourGeneralInfo = require("./App/models/ToursAndActivities/TourGeneralInfoModle");
const TourSettings = require("./App/models/ToursAndActivities/TourSettingsModel");
const TourBroadcast = require("./App/models/ToursAndActivities/TourBrodcatsModel");

//ROUTES
const userRoutes = require("./App/routes/CustomerManagement/CustomersRoutes");
const tourRoutes = require("./App/routes/ToursAndActivities/TourRoutes");
const tourCategoryRoutes = require("./App/routes/ToursAndActivities/TourCategoriesRoutes");
const rezervationRoutes = require("./App/routes/Reservations/RezervationRoutes");
const participantRoutes = require("./App/routes/Reservations/ParticipantRoutes");
const tahsilatRoutes = require("./App/routes/Accounting/tahsilatRoutes");
const reportRoutes = require("./App/routes/Reporting/SalesReportRoutes");
const otherServiceRoutes = require("./App/routes/OtherServices/OtherServiceRoutes");
const offersRoutes = require("./App/routes/Offers/offerRoutes");
const inboxRoutes = require("./App/routes/Inbox/inboxRoutes");
const socialRoutes = require("./App/routes/GeneralSettings/socialmediaRoutes");
const companyinfoRoutes = require("./App/routes/GeneralSettings/companyinfoRoutes");
const agencyRoutes = require("./App/routes/GeneralSettings/agencuRoutes");
const adminuserRoutes = require("./App/routes/GeneralSettings/adminuserRoutes");

const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

createConnection({
  ...ormconfig,
  entities: [
    Customer,
    Tahsilat,
    AdminUser,
    AgencyModel,
    CompanyInfos,
    SocialMedia,
    Inbox,
    Offers,
    OteherService,
    SaleReport,
    Partipant,
    Rezervation,
    TourCategory,
    Tour,
    TourDetail,
    TourExtension,
    TourGeneralInfo,
    TourSettings,
    TourBroadcast,
    TourGallery,
  ],
})
  .then(() => {
    console.log("Database connected");
    //ROUTES
    app.use("/users", userRoutes);
    app.use("/tours", tourRoutes);
    app.use("/toursCategory", tourCategoryRoutes);
    app.use("/reservations", rezervationRoutes);
    app.use("/participant", participantRoutes);
    app.use("/tahsilat", tahsilatRoutes);
    app.use("/report", reportRoutes);
    app.use("/otherservice", otherServiceRoutes);
    app.use("/offers", offersRoutes);
    app.use("/inbox", inboxRoutes);
    app.use("/socialmedia", socialRoutes);
    app.use("/companyinfo", companyinfoRoutes);
    app.use("/agency", agencyRoutes);
    app.use("/adminuser", adminuserRoutes);

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => console.log(error));
