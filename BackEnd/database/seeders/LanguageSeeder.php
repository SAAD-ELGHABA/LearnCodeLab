<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            [
                'name' => 'javascript',
                'description' => "JavaScript is a versatile, high-level programming language primarily used for web development. It enables dynamic interactivity on websites when used alongside HTML and CSS. JavaScript allows developers to implement complex features such as real-time updates, form validation, animations, and more. It runs on the client-side in the browser, but with the advent of Node.js, it’s also widely used on the server-side. JavaScript has a huge ecosystem, supported by countless frameworks and libraries like React, Vue, and Angular, making it one of the most in-demand languages today. It supports object-oriented, imperative, and functional programming styles, giving developers flexibility in how they write code. JavaScript’s asynchronous features like promises and async/await allow smooth handling of operations like API calls. It’s constantly evolving, with ECMAScript updates adding modern features to simplify development. Overall, JavaScript is essential for creating rich, responsive, and interactive web applications across all platforms."
            ],
            [
                'name' => 'php',
                'description' => "PHP is a popular server-side scripting language designed specifically for web development. Originally created in 1994, it has evolved significantly and powers major websites and platforms like WordPress and Facebook. PHP is embedded into HTML, which makes it easy to generate dynamic web page content. It supports multiple databases, including MySQL and PostgreSQL, and works well with Apache and Nginx web servers. PHP offers excellent support for object-oriented programming, and modern PHP frameworks like Laravel, Symfony, and CodeIgniter have revolutionized web development by enforcing MVC architecture, routing, and security practices. PHP is known for its simplicity, wide community support, and rich library of functions that make tasks like file handling, form validation, and session management easier. It integrates well with front-end technologies and APIs. Though it has faced criticism in the past, continuous updates and an active developer community have kept PHP relevant in today’s full-stack development landscape."
            ],
            [
                'name' => 'python',
                'description' => "Python is a powerful, high-level programming language known for its simplicity and readability. Created in the late 1980s, it has become one of the most widely used languages across various domains including web development, data science, artificial intelligence, automation, and education. Python uses an easy-to-understand syntax, making it ideal for beginners and professionals alike. Popular frameworks like Django and Flask support rapid web development, while libraries like NumPy, Pandas, and TensorFlow cater to scientific computing and machine learning. Python’s interpreted nature allows for quick testing and development, and its extensive standard library provides tools for tasks such as file I/O, regular expressions, and threading. Its strong community ensures continuous improvement and a wealth of tutorials and third-party packages. Python’s versatility and ecosystem make it a go-to choice for building anything from web apps to AI-driven applications, and it is consistently ranked among the top programming languages globally."
            ],
            [
                'name' => 'html',
                'description' => "HTML (HyperText Markup Language) is the foundational language for creating web pages. It defines the structure and layout of web content using a series of elements and tags. HTML is used to organize content such as headings, paragraphs, links, images, and multimedia. It works alongside CSS and JavaScript to build modern, interactive websites. HTML is not a programming language but a markup language that describes the structure of documents for web browsers. With the introduction of HTML5, many new elements were added, enabling developers to embed video, audio, and canvas graphics without relying on external plugins. HTML also supports semantic tags, which help improve SEO and accessibility. It’s lightweight, easy to learn, and essential for anyone starting in web development. Whether you’re building a simple static site or a complex web application, HTML remains a core technology of the World Wide Web."
            ],
            [
                'name' => 'algorithm',
                'description' => "An algorithm is a well-defined, step-by-step procedure used to solve problems or perform computations. It forms the backbone of computer science and programming by providing a structured way to process data, make decisions, and automate tasks. Algorithms can range from simple arithmetic to complex decision-making and optimization processes. They are language-independent and can be implemented in any programming language. Common types include sorting algorithms (like quicksort and mergesort), searching algorithms (like binary search), and graph algorithms (like Dijkstra’s). Efficiency is measured using time and space complexity, often analyzed through Big O notation. Understanding algorithms is essential for writing efficient, scalable code, particularly in data structures, machine learning, and competitive programming. Algorithms are applied in real-world systems such as search engines, recommendation systems, GPS routing, and encryption. Mastering algorithmic thinking improves problem-solving skills and is a crucial part of technical interviews and advanced software development."
            ],
            [
                'name' => 'css',
                'description' => "CSS (Cascading Style Sheets) is a stylesheet language used to control the presentation and layout of HTML documents. It allows developers to separate content from design, making web pages more maintainable and aesthetically appealing. CSS enables you to apply styles such as colors, fonts, spacing, and animations across multiple web pages with ease. It supports responsive design through media queries, allowing websites to adapt to various screen sizes and devices. CSS can be written inline, embedded in the head of an HTML document, or included in external style sheets. Modern CSS includes powerful features like Flexbox and Grid for complex layouts, variables for reusability, and transitions for interactivity. Preprocessors like Sass and Less enhance CSS by introducing programming constructs like variables and functions. Understanding CSS is vital for front-end developers aiming to build visually engaging and user-friendly websites that adhere to modern design principles and accessibility standards."
            ],
            [
                'name' => 'laravel',
                'description' => "Laravel is a modern PHP web application framework known for its elegant syntax and powerful tools. It follows the MVC (Model-View-Controller) architectural pattern, enabling clean separation of concerns. Laravel simplifies many common development tasks such as routing, authentication, session handling, and database interactions through Eloquent ORM. It includes built-in features like Blade templating, middleware, queues, events, and broadcasting, making it ideal for scalable and maintainable web applications. Laravel also offers Laravel Mix for asset management, and Laravel Forge and Vapor for deployment and server management. Artisan CLI facilitates development through various commands like migrations and scaffolding. Laravel has a vibrant ecosystem and community, including packages like Jetstream and Breeze for authentication, and Nova for admin dashboards. Its documentation is extensive and beginner-friendly, making Laravel a top choice for developers building robust PHP applications quickly and efficiently."
            ],
            [
                'name' => 'react',
                "description" => "React is a JavaScript library developed by Facebook for building fast, interactive user interfaces. It is component-based, meaning the UI is broken down into reusable pieces, each managing its own state. React uses a virtual DOM to efficiently update the browser’s real DOM, improving performance in dynamic web applications. It supports hooks, a feature that allows functional components to use state and side effects. React is often used with tools like Redux for state management, React Router for navigation, and Next.js for server-side rendering. Its modular architecture makes it ideal for building scalable applications, from single-page apps to complex platforms. React has a large community, extensive ecosystem, and is widely adopted in both startups and large enterprises. With JSX syntax, developers can write HTML-like code in JavaScript, making it intuitive and readable. React’s flexibility and performance make it a leading choice for modern front-end development."
            ],
            [
                'name' => 'bootstrap',
                'description' => "Bootstrap is a popular front-end framework developed by Twitter for building responsive, mobile-first websites quickly and efficiently. It offers a vast collection of pre-designed components such as navigation bars, buttons, forms, cards, and modals, all built with HTML, CSS, and JavaScript. Bootstrap uses a 12-column grid system that ensures layouts adapt to different screen sizes, improving user experience across devices. It simplifies styling with built-in utility classes and themes, allowing developers to create polished interfaces without writing extensive CSS from scratch. Bootstrap also supports JavaScript plugins for interactive features like carousels, tooltips, and dropdowns. Version 5 dropped jQuery dependency, making it more lightweight and modern. Bootstrap’s consistency, cross-browser compatibility, and ease of use make it a go-to framework for prototyping and full-scale development. Whether you're a beginner or a seasoned developer, Bootstrap speeds up the design process while maintaining a professional, clean aesthetic."
            ],
        ];

        foreach ($languages as $language) {
            Language::create($language);
        }
    }
}
