\# Reflection



\#

Most Challenging Part



Being relatively new to React, I have to say that the most challenging part of this project was understanding how all the parts tie in together (hooks, context, components, etc.), so planning was not easy for me. I mean I was ok setting up the Vite project and file structure, but putting all together was quite challenging.



Also, understanding how the Context API works and how data flows through the application. More specifically, trying to understand how the 'FavoritesProvider' context in the 'FavoriteContext.jsx' file makes data available to components that are nested inside it and why the order of wrapping in 'main.jsx' following a sorta "nesting dolls" order matters, where 'BrowserRouter' has to wrap 'FavoritesProvider' which in turn has to wrap 'App'.



Also Understanding the difference between 'useParams' and 'useLocation' was a bit confusing to me at first because both read from the URL but in different ways:

* 'useParams' reads DYNAMIC route parameters like '/category/:categoryName'
* while 'useLocation' reads query strings like '/search?query=chicken'.





\#

Design Decisions



Instead of calling `useLocalStorage` directly inside individual components, I chose to keep it inside `FavoritesContext` so that persistence is handled from one location and therefore any component that uses 'useFavorites()' automatically gets localStorage persistence.



Also, I ended up placing the Navbar outside of Routes after realizing that anything outside <Routes> renders on every page. Anything inside only renders on matched routes.
By doing this meant that the Navbar now appears on every single page automatically, rather than having to add it manually to each page component.



Also, at the beginning I was getting a particular error across all the page files:



&nbsp;"Uncaught SyntaxError: The requested module '/src/pages/CategoryPage.jsx' does not provide an export named 'default' (at App.jsx:8:8)"

&nbsp;

...triggered by these page files being empty, so I proceeded to add temp placeholders to these empty page files, rather than removing imports from App.jsx temporarily. By doing this it kept the routing structure untouched while allowing me to build pages one at a time and see a  gradual progress as far as functionality is concerned (not style).

