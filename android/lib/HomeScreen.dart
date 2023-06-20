import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String group = ""; // Group received from the server response
  bool isLoading = true;
  String cookies = "sessionid=";
  String? cookie = "";

  Future<String> fetchData() async {
    final url = dotenv.env['SERVER']!+'/auth'; // Replace with your server URL
    final sharedPreferences = await SharedPreferences.getInstance();
    cookie = sharedPreferences.getString('cookie');
    if (cookies != null) {
      cookies += cookie!;
    }
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode({'cookies': cookies}); // Replace 'your_cookie_value' with the actual cookie value

    final response = await http.post(Uri.parse(url), headers: headers, body: body);

    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      setState(() {
        group = responseData['group'];
        isLoading = false;
      });
    } else {
      throw Exception('Failed to fetch data');
    }

    return group;
  }

  Future<void> logout() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    cookie = sharedPreferences.getString('cookie');
    final body = jsonEncode({'cookies': cookies}); // Replace 'your_cookie_value' with the actual cookie value
    final url = dotenv.env['SERVER']!+'/logout'; // Replace with your server URL
    final headers = {'Content-Type': 'application/json'};
    final response = await http.post(Uri.parse(url), headers: headers, body: body);

    if (response.statusCode == 200) {
      sharedPreferences.remove('cookie');
      Navigator.pushReplacementNamed(context, '/login'); // Replace '/login' with your login route
    }
    else{
      throw Exception('Failed to logout');
    }

  }

  @override
  void initState() {
    super.initState();
    fetchData().catchError((error) {
      print('Error: $error');
      // Handle error accordingly
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Screen'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text(
                'Menu',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            if (group == 'faculties')
              ListTile(
                title: Text('Clubs'),
                onTap: () {
                  // Handle clubs menu item press
                },
              ),
            if (group == 'faculties' || group == 'student')
              ListTile(
                title: Text('Students'),
                onTap: () {
                  // Handle students menu item press
                },
              ),
            ListTile(
              title: Text('Events'),
              onTap: () {
                // Handle events menu item press
              },
            ),
            ListTile(
              title: Text('Logout'),
              onTap: logout,
            ),
          ],
        ),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : TabBarView(
        children: [
          if (group == 'faculties') ClubsTab(),
          if (group == 'faculties' || group == 'student') StudentsTab(),
          EventsTab(),
        ],
      ),
    );
  }
}

class EventsTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Events Tab'),
    );
  }
}

class ClubsTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Clubs Tab'),
    );
  }
}

class StudentsTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Students Tab'),
    );
  }
}
