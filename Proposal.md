## TV Series/Movies Find one better application

1. What tech stack will you use for your final project? We recommend that you use
React and Node for this project, however if you are extremely interested in
becoming a Python developer you are welcome to use Python/Flask for this
Project.
    - I will use React and Nodejs for this project.

2. Is the front-end UI or the back-end going to be the focus of your project? Or are
you going to make an evenly focused full-stack application?
    - I am planning to develop a full-stack application, with a particular emphasis on enhancing my frontend skills, especially in design (React/CSS). While I feel confident in my backend abilities, I recognize the need to invest a significant amount of time in improving the aesthetics of my projects. I've encountered challenges in the past with CSS in frontend development, leading to less visually appealing web designs. Therefore, my primary focus will be on refining my frontend UI, although I aim for a well-rounded skill set in both frontend and backend development.

3. Will this be a website? A mobile app? Something else?
    - Whether it becomes a website, a mobile app, or something else depends on the choice between using a CSS framework or going with vanilla CSS. The Bootstrap framework is particularly useful, allowing for design compatibility across both websites and mobile apps simultaneously.

4. What goal will your project be designed to achieve?
    - The goal of the project is to create a web and mobile app that resembles popular streaming services such as Netflix, Amazon Prime, and Disney Plus. The app will feature content exploration for movies, TV series, and possibly video games. In addition to this, the app will incorporate social media elements, enabling discussions, recommendations, and the possibility of 'watch together' functionalities if feasible. It's important to note that this app is not intended to be a real streaming service but rather an ideal website design inspired by platforms like Netflix.

5. What kind of users will visit your app? In other words, what is the demographic of
your users?
    - Users of the app will primarily be interested in exploring TV shows, movies, and video games. 
    - The app aims to align ratings and categories with users' interests. Additionally, users will have the ability to:
request to add friends.
navigate through user profiles, exploring their interests.
Explore users’ activities, including what they watch and the video games they play.
6. What data do you plan on using? How are you planning on collecting your data?
You may have not picked your actual API yet, which is fine, just outline what kind
of data you would like it to contain. You are welcome to create your own API and
populate it with data. If you are using a Python/Flask stack are required to create
your own API.
    - I will use OMBd API or IMDB API to access movies and TV series data. And RAWG Video Games Database API to access video game data. 
    - (Updated: 12/13/2023) TMDB API is better. It gives list of movies and TV series.

7. In brief, outline your approach to creating your project (knowing that you may not
know everything in advance and that these details might change later). Answer
questions like the ones below, but feel free to add more information:
    - a. What does your database schema look like?
    ![Database Schema](/Database_Schemas_Design/UpdatedSchema.png)

    - b. What kinds of issues might you run into with your API? This is especially
    important if you are creating your own API, web scraping produces
    notoriously messy data.
        - OMBb API
    Generate the API Key by entering your email and first name/last name, then submit the form. It is free but comes with 1,000 daily limits.
        - (Updated: 12/13/2023) The TMDB API has legacy rate limits: 40 requests per 10 seconds or 50 requests per 1 second.
        - (Updated: 12/13/2023) Creating the favorite/watch list in the database may be challenging. If a user navigates to a list with 20 or 30 IDs, the website will generate 20 or 30 requests, potentially putting stress on the server.
            - (Updated: 12/13/2023) Possible Solution is to create own database with movie id and tv series id for favorite/watch list.

    - c. Is there any sensitive information you need to secure?
    Hash passwords using the bcrypt package in the backend for added security.
        - Implement CORS to restrict access to data from unauthorized domains.
        - Utilize a private router to ensure that only the authenticated user can access and explore their personal information, activities, and content such as movies, TV series, and potentially video games. 

    - d. What functionality will your app include?
        - Select TV Series/Movies or Video Games from the navigation bar.
        - Explore TV series/movies or video games to view titles, categories, ratings, and recommendations.
        - Display the number of views for each TV series/movie.
        - Navigate to view Friend Requests, Following/Followers, Check interests and activities, and access Direct Messages.
        - Engage in discussions, view posts, and read comments.
    - e. What will the user flow look like?
        - Sign Up/Login, with hashed password for security.
        - Search form functionality.
        - Lists for favorites
        - Navbar with options for Home, Sign Up/Login, and protected sections for TV Series/Movies and Video Games.

    - f. What features make your site more than a CRUD app? What are your
    stretch goals?
        - User information managed in React state for login/logout functionality.
        - Displaying movies, TV series, and video game data retrieved from the API.
        - Implementation of Create/Update/Delete functionality for accounts, posts, comments, friend/follow actions, and favorite lists.
