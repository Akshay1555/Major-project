const express = require("express");
const cors = require("cors");
const bcrypt=require("bcrypt");
const databaseConnect = require("./db/config");
const RegistrationDetailsSchema = require("./db/RegeistraionDetailsSchema");
const EmployeeRecordsSchema=require("./db/EmployeeRecordsSchema");
const RequirementSchema = require("./db/RequirementSchema");
const AdminRecordsSchema = require("./db/AdminRecordsSchema");

const axios =require("axios")
const app = express();
const port = 8000;



// Middleware
app.use(express.json());
app.use(cors());

// Database connection
databaseConnect();




// Fetch data function
const fetchData = async () => {
  try {
    const data = await RegistrationDetailsSchema.find();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// Call the fetchData function
fetchData();

// Routes
app.get("/", (req, res) => {
  console.log("Home page");
  res.send("Welcome to the Goshala API");
});

// app.post("/registration", async (req, res) => {
//   try {
//     let user = new RegistrationDetailsSchema(req.body);
//   //   const upload=multer({
//   //     storage:multer.diskStorage({
//   //         destination:function(req,file,cb){
//   //             cb(null,"uploads/")
//   //         },
//   //         filename:function(req,file,cb){
//   //             cb(null,file.filename+".jpg");
//   //       }
//   //   })
//   // });
//     let result = await user.save();
  
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



app.post("/registration", async (req, res) => {
  try {
    let user = new RegistrationDetailsSchema(req.body);
    let result = await user.save();
  
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/Certificate", (req, res) => {
  console.log("Certificate page");
  // Handle Certificate page logic here
});

app.get("/UpdateInfo", async (req, res) => {
  try {
    let user = await RegistrationDetailsSchema.findOne({ _id: req.params.userId });
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/getGoshalas/:id", async (req, res) => {
  try {
    let result = await RegistrationDetailsSchema.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.status(404).json({ result: "No record found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/Login", async (req, res) => {
//   const { email, password, role } = req.body;
//   console.log("Result:", email); // Log the email
//   if (password && email && role) { // Check if password, email, and role are present
//     try {
//       let user;
//       if (role === 'goshalas') {
//         user = await RegistrationDetailsSchema.findOne({ email, password, role }).select("-password");
//       } else if (role === 'employee') {
//         user = await EmployeeRecordsSchema.findOne({ email, password, role }).select("-password");
//       } else if (role==="admin") {
//         user = await AdminRecordsSchema.findOne({ email, password, role }).select("-password");
//       }else{
//         alert("Incorrect Deatials");
//       }

//       if (user) {
//         res.send(user);
//       } else {
//         res.status(404).json({ result: "No user found" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     res.status(400).json({ error: "Missing required fields" });
//   }
//});
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Result:", email); // Log the email
  if (password && email && role) { // Check if password, email, and role are present
    try {
      let user;
      if (role === 'goshalas') {
        user = await RegistrationDetailsSchema.findOne({ email, role });
      } else if (role === 'employee') {
        user = await EmployeeRecordsSchema.findOne({ email, role });
      } else if (role === 'admin') {
        user = await AdminRecordsSchema.findOne({ email });
      } else {
        return res.status(400).json({ error: "Invalid role" });
      }

      if (!user) {
        return res.status(404).json({ error: "Email is not registered" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, send user data without password
        const userData = { ...user.toObject() };
        delete userData.password;
        res.send(userData);
      } else {
        // Passwords don't match
        res.status(401).json({ error: "Incorrect password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Missing required fields" });
  }
});



app.put("/updateGoshala/:id", async (req, res) => {
  try {
    const updateFields = {
      goshalaName: req.body.goshalaName,
      establishmentDate: req.body.establishmentDate,
      about: req.body.about,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
      district: req.body.district,
      state: req.body.state,
      applicantName: req.body.applicantName,
      registrationNo: req.body.atgNo,
      landType: req.body.landType,
      landArea: req.body.landArea,
      category: req.body.category,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      requirements: req.body.requirements,
      animals: req.body.animals,
      facilities: req.body.facilities,
    };

    let goshala = await RegistrationDetailsSchema.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (goshala) {
      res.status(200).json({ message: 'Goshala details updated successfully', goshala });
    } else {
      res.status(404).json({ error: 'Goshala not found' });
    }
  } catch (error) {
    console.error('Error updating Goshala:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get("/search/:key", async (req, res) => {
  try {
    console.log(req.params.key);
    let data = await RegistrationDetailsSchema.find({
      "$or": [
        { "goshalaName": { $regex: req.params.key } },
        { "district": { $regex: req.params.key } }
      ]
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/getGoshalas', async (req, res) => {
  try {
    let users = await RegistrationDetailsSchema.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/empData", async (req, res) => {
  const data = await EmployeeRecordsSchema.find({}, 'name email password');
  res.json({ success: true, data: data });
});

// create the records
// localhost:8001/create
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new EmployeeRecordsSchema(req.body);
  await data.save();
  res.send({ success: true, message: "data saved successfully", data: data });
});

// update the employee records
// localhost:8001/update
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await EmployeeRecordsSchema.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

// delete the records of employee
// localhost:8001/delete/id
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const data = await EmployeeRecordsSchema.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});


app.post("/createAdmin", async (req, res) => {
  try {
    // Check if there are already two admin records in the database
    const adminCount = await AdminRecordsSchema.countDocuments();
    if (adminCount >= 2) {
      return res.status(400).json({ error: "Maximum limit of admin records reached" });
    }
    
    let admin = new AdminRecordsSchema(req.body);
    let result = await admin.save();
    res.send({ success: true, message: "Admin created successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/adminData", async (req, res) => {
  try {
    const adminData = await AdminRecordsSchema.find({}, 'name email password');
    res.json({ success: true, data: adminData });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Update Admin


app.put("/updateAdmin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, password } = req.body;
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the admin record with the hashed password
    const updatedAdmin = await AdminRecordsSchema.findByIdAndUpdate(adminId, { name, email, password: hashedPassword }, { new: true });
    if (updatedAdmin) {
      res.status(200).json({ success: true, message: 'Admin details updated successfully', admin: updatedAdmin });
    } else {
      res.status(404).json({ success: false, error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error updating Admin:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Delete Admin
app.delete("/deleteAdmin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await AdminRecordsSchema.findByIdAndDelete(adminId);
    if (deletedAdmin) {
      res.status(200).json({ success: true, message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error deleting Admin:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Payment


app.post("/payment", async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  try {
    const data = await axios.post(
      "https://api.razorpay.com/v1/orders",
      { amount, currency, receipt, notes },
      {
        auth: {
          username: "rzp_test_I0Fbg1GKFsHUFd",
          password: "t6LHAJhUu17Y5sdRPcprVXuV",
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: data.data,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error.message,
    });
  }
}
)


app.post("/payment/cp", async (req, res) => {
  const { paymentId, amount } = req.body;
  try {
    const url = `https://api.razorpay.com/v1/payments/${paymentId}/capture`;

    const data = await axios.post(
      url,
      {
        amount: amount,
        currency: "INR",
      },
      {
        auth: {
          username: "rzp_test_I0Fbg1GKFsHUFd",
          password: "t6LHAJhUu17Y5sdRPcprVXuV",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment Captured Successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: `Error Capturing Payment: ${error}`,
    });
  }
})




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});