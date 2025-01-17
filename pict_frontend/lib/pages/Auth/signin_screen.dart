import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:logger/logger.dart';
import 'package:pict_frontend/pages/Auth/signup_screen.dart';
import 'package:pict_frontend/pages/Organizer/organizer_dashboard.dart';
import 'package:pict_frontend/pages/Recycler/recycler_home_screen.dart';
import 'package:pict_frontend/pages/User/user_dashboard.dart';
import 'package:pict_frontend/services/auth_service.dart';
import 'package:pict_frontend/utils/constants/app_colors.dart';
import 'package:pict_frontend/utils/constants/app_constants.dart';
import 'package:pict_frontend/utils/session/SharedPreference.dart';

class SignInPage extends StatefulWidget {
  const SignInPage({super.key});

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  var logger = Logger();

  final _formKey = GlobalKey<FormState>();

  final TextEditingController _emailController =
      TextEditingController(text: "");
  final TextEditingController _passwordController =
      TextEditingController(text: "");

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 24.0, horizontal: 20.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(
                  height: 10,
                ),
                Container(
                  width: 250,
                  height: 250,
                  decoration: BoxDecoration(
                    color: Colors.deepPurple.shade50,
                    shape: BoxShape.circle,
                  ),
                  child: Image.asset(
                    AppConstants.loginIcon,
                    fit: BoxFit.cover,
                    width: 100,
                    height: 50,
                  ),
                  // child: Image(image: AssetImage(AppConstants.loginIcon)),
                ),
                const SizedBox(
                  height: 20.0,
                ),
                const Text(
                  "Sign In",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 35,
                    color: TColors.primaryGreen,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Divider(
                  color: Colors.grey.shade300,
                ),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Theme.of(context).brightness == Brightness.dark
                        ? TColors.black
                        : TColors.white,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(
                          height: 8,
                        ),

                        // ? Email Field
                        Padding(
                          padding: const EdgeInsets.fromLTRB(5, 0, 0, 5),
                          child: Text(
                            "Your Email Address: ",
                            style: Theme.of(context).textTheme.bodyMedium,
                            textAlign: TextAlign.start,
                          ),
                        ),
                        TextFormField(
                          validator: (value) {
                            if (value == "") {
                              return "Enter Your Email Address";
                            } else if (value!.contains('@')) {
                              return null;
                            } else {
                              return "Enter valid Email Address";
                            }
                          },
                          controller: _emailController,
                          keyboardType: TextInputType.multiline,
                          // style: const TextStyle(
                          //     fontSize: 18, fontWeight: FontWeight.normal),
                          // decoration: InputDecoration(
                          //   contentPadding: const EdgeInsets.symmetric(
                          //       horizontal: 10, vertical: 10),
                          //   border: OutlineInputBorder(
                          //     borderSide:
                          //         const BorderSide(color: Colors.black12),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   enabledBorder: OutlineInputBorder(
                          //     borderSide:
                          //         const BorderSide(color: Colors.black12),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   focusedBorder: OutlineInputBorder(
                          //     borderSide:
                          //         const BorderSide(color: Colors.black12),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   errorBorder: OutlineInputBorder(
                          //     borderSide: const BorderSide(color: Colors.red),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   hintText: "Enter Your Email Address",
                          //   hintStyle: const TextStyle(
                          //       fontWeight: FontWeight.normal, fontSize: 14),
                          // ),
                        ),

                        const SizedBox(
                          height: 10,
                        ),

                        // ? Password Field
                        Padding(
                          padding: const EdgeInsets.fromLTRB(5, 0, 0, 5),
                          child: Text(
                            "Your Password: ",
                            style: Theme.of(context).textTheme.bodyMedium,
                            textAlign: TextAlign.start,
                          ),
                        ),
                        TextFormField(
                          validator: (value) {
                            if (value == "") {
                              return "Enter Your Password";
                            }
                            return null;
                          },
                          controller: _passwordController,
                          obscureText: true,
                          keyboardType: TextInputType.text,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.normal,
                          ),
                          // decoration:
                          //     Theme.of(context).brightness == Brightness.dark
                          //         ? Theme.of(context).inputDecorationTheme
                          //         : Theme.of(context).inputDecorationTheme,
                          // decoration: InputDecoration(
                          //   contentPadding: const EdgeInsets.symmetric(
                          //       horizontal: 10, vertical: 10),
                          //   border: OutlineInputBorder(
                          //     borderSide:
                          //         const BorderSide(color: Colors.black12),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   enabledBorder: OutlineInputBorder(
                          //     borderSide:
                          //         const BorderSide(color: Colors.black12),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   focusedBorder: OutlineInputBorder(
                          //     borderSide:
                          //         const BorderSide(color: Colors.black12),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   errorBorder: OutlineInputBorder(
                          //     borderSide: const BorderSide(color: Colors.red),
                          //     borderRadius: BorderRadius.circular(5),
                          //   ),
                          //   hintText: "Enter Your Password",
                          //   hintStyle: const TextStyle(
                          //       fontWeight: FontWeight.normal, fontSize: 14),
                          // ),
                        ),

                        const SizedBox(
                          height: 10,
                        ),

                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () async {
                              if (_formKey.currentState!.validate()) {
                                Map<String, dynamic> response =
                                    await AuthServices.signIn(
                                  _emailController.text,
                                  _passwordController.text,
                                );

                                print(response);

                                if (response["result"] !=
                                        "Invalid Credentials" &&
                                    response["result"]["message"] == "ok") {
                                  // Entire user
                                  var account = response["result"]["data"];

                                  // Push the user data into sharedPreferences
                                  String res = await Utils.setSession(account);

                                  if (res == "ok") {
                                    if (account["role"] == "user") {
                                      Navigator.pushReplacement(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              const UserDashboard(),
                                        ),
                                      );
                                    } else if (account["role"] == "recycler") {
                                      Navigator.pushReplacement(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              const RecyclerHomePage(),
                                        ),
                                      );
                                    } else if (account["role"] == "organizer") {
                                      Navigator.pushReplacement(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              const OrganizerDashboard(),
                                        ),
                                      );
                                    }
                                  }
                                } else if (response["result"] ==
                                    "Invalid Credentials") {
                                  Fluttertoast.showToast(
                                    msg: "Invalid Credentials",
                                    toastLength: Toast.LENGTH_SHORT,
                                    gravity: ToastGravity.CENTER,
                                    timeInSecForIosWeb: 1,
                                    backgroundColor: Colors.red,
                                    textColor: Colors.black,
                                    fontSize: 16.0,
                                  );
                                } else {
                                  Fluttertoast.showToast(
                                    msg: "Internal Server Error",
                                    toastLength: Toast.LENGTH_SHORT,
                                    gravity: ToastGravity.CENTER,
                                    timeInSecForIosWeb: 1,
                                    backgroundColor: Colors.red,
                                    textColor: Colors.black,
                                    fontSize: 16.0,
                                  );
                                }
                              }
                            },
                            style: ElevatedButton.styleFrom(
                              foregroundColor: Colors.black,
                              backgroundColor: TColors.primaryGreen,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50),
                              ),
                            ),
                            child: const Padding(
                              padding: EdgeInsets.all(16.0),
                              child: Text(
                                "Sign In",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(
                          height: 10,
                        ),

                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              "Not have an account?",
                              style: TextStyle(
                                color: Colors.grey.shade600,
                                fontSize: 16,
                              ),
                            ),
                            const SizedBox(
                              width: 5,
                            ),
                            GestureDetector(
                              onTap: () {
                                Navigator.pushReplacement(context,
                                    MaterialPageRoute(builder: (context) {
                                  return const SignUpPage();
                                }));
                              },
                              child: const Text(
                                "Sign Up",
                                style: TextStyle(
                                  color: Colors.blue,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
