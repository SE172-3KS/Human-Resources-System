# 3ks-human-resources-system

### Installation Instructions
1. npm install

### Run application
1. npm run build
2. npm start (application will automatically recompile when you make changes -- excludes changes in server.js)
3. Ctrl+C to end application

### Database
1. Unzip db/test_db-master
2. Cd into test_db-master
3. Load data into MySQL using the cmd:<br>
		mysql -t < employees.sql <br> 
	 or mysql -r root -p -t < employees.sql (depends on how you setup ur mysql) <br>
4. To verify the data is there and correct, run:<br>
		time mysql -t < test_employees_sha.sql<br>
		time mysql -t < test_employees_md5.sql<br>
	Status should return all 'OK', removes the unzipped folder when you're done<br>

### Database user
1. Edit server.js to input your own MySQL username and password or create a new user as followed
2. Create user: CREATE USER '3ks'@'localhost' IDENTIFIED BY '123456';
3. Grant access: GRANT ALL PRIVILEGES ON employees.* TO '3ks'@'localhost' WITH GRANT OPTION;

test change3
