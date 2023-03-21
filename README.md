# notion


## Get Started

### Clone the repo
```
 git clone https://github.com/sandeepahuja-stack/notion.git
```
### Install the dependencies
```
   cd client
   npm install 

   cd server
   npm install
```

#### Running an app in server (port: 8000) and client (port : 3000)

```  
   cd client 
   npm start 

   cd server
   npm run start
```


## Structure of an app
```
client/
    src/
    |-- constants/ => apiendpoints and many more
    |-- assets/
    |-- components/ 
            |-- FilterContainer
               |-- index.js
               |-- FilterContainer.js
            |-- FilterGroup
                |-- index.js
                |-- FilterGroup.js
            |--Filter
            |-- common => resuable components
            ....
    |-- hooks/ => resuable custom hooks with business logics 
    |-- services => resuable apis
    |-- helpers 
server/
   src/ 
   |-- server.js => api end points
```


## Tools Used
- [React] (https://reactjs.org/) - overall app based on react
- [Material Ui] (https://mui.com/material-ui/getting-started/overview/) - UI Components

- [axios]: For Api calls
- [react-beautiful-dnd] (https://github.com/atlassian/react-beautiful-dnd)


```
  Note: There are some bugs which can be solved but due to time constraint unable to do all the feature
```
