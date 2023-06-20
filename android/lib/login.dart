import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController _idController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  Future<void> _login() async {
    final url = Uri.parse(dotenv.env['SERVER']!+'/proxy/login');
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode({
      'id': _idController.text,
      'passwd': _passwordController.text,
    });

    try {
      final response = await http.post(url, headers: headers, body: body);

      if (response.statusCode == 200) {
        // Login successful, handle the response
        final cookies = jsonDecode(response.body)['sessionid'];
        final sharedPreferences = await SharedPreferences.getInstance();
        await sharedPreferences.setString('cookie', cookies);
        print(response.body);
        Navigator.pushNamed(context, '/home');
      } else {
        // Login failed, handle the error
        print('Error: ${response.statusCode}');
      }
    } catch (e) {
      // An error occurred during the login request
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login Page'),
      ),
      body: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _idController,
              decoration: InputDecoration(
                labelText: 'User Id',
              ),
            ),
            SizedBox(height: 16.0),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: 'Password',
              ),
              obscureText: true,
            ),
            SizedBox(height: 24.0),
            ElevatedButton(
              onPressed: _login,
              child: Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}