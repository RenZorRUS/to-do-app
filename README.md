# To-Do-app
Django To-Do Application Training Project

<h1>Getting Started</h1>
<p>These instructions will help you to get a copy of the project up and running on your local machine for development and testing</p>

<h2>Installing</h2>
<pre>Firstly, you need to open terminal and type</pre>
<code>git clone git@github.com:RenZorRUS/To-Do-app.git</code><br>

<h4>or you can simply download using the url below</h4>
<code>https://github.com/RenZorRUS/To-Do-app.git</code><br><br>

<pre>Secondly, you need to install all the modules described in requirement.txt file. 
Just open terminal in project directory and type</pre>
<code>pip install -r requirements.txt</code><br>

<h2>Database</h2>
<pre>Thirdly, to migrate the database type</pre>
<code>python manage.py makemigrations</code><br>
<code>python manage.py migrate</code>

<h2>Admin panel</h2>
<pre>And to use admin panel you need to create superuser using this command</pre>
<code>python manage.py createsuperuser</code>

<h2>Run the program</h2>
<pre>To run the program in local server use the following command </pre>
<code>python manage.py runserver</code><br><br>
<p>And then go to http://127.0.0.1:8000 in your browser</p>

<h2>Project gif</h2>

* Add tasks

![Gif of adding task](https://github.com/RenZorRUS/To-Do-app/blob/main/gif/Adding%20tasks.gif)

* Update tasks

![Gif of updating task](https://github.com/RenZorRUS/To-Do-app/blob/main/gif/Updating%20tasks.gif)

* Mark you tasks as complete

![Gif of completing task](https://github.com/RenZorRUS/To-Do-app/blob/main/gif/Completing%20tasks.gif)

* Delete tasks 

![Gif of deleting task](https://github.com/RenZorRUS/To-Do-app/blob/main/gif/Deleting%20tasks.gif)
