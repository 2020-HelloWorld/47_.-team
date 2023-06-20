import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SessionPage extends StatefulWidget {
  @override
  _SessionPageState createState() => _SessionPageState();
}

class _SessionPageState extends State<SessionPage> {
  String cookies= "sessionid=";
  String? cookie = "";

  @override
  void initState() {
    super.initState();
    fetchData().catchError((error) {
      print('Error: $error');
    });
  }

  Future<void> fetchData() async {
    try {
      final sharedPreferences = await SharedPreferences.getInstance();
      cookie = sharedPreferences.getString('cookie');
      if (cookies != null) {
        cookies += cookie!;
      }
    } catch (e) {
      print("Error Retrieving Cookie");
    }
    final url = dotenv.env['SERVER']!+'/auth'; // Replace with your API endpoint
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode({'cookies': cookies});

    final response = await http.post(Uri.parse(url), headers: headers, body: body);

    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      Navigator.pushNamed(context, '/home');
    } else {
      Navigator.pushNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome'),
      ),
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
