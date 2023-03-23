# notion table practice


## Get Started

### Clone the repo
```
 git clone https://github.com/sandeepahuja-stack/notion.git
```
### Install the dependencies
```
   Node version - v14.15.0
   
   cd client
   npm install 

   cd server
   npm install
```

#### Running an app in server (port: 8000) and client 

```  
   cd client 
   npm start 

   cd server
   npm run start
```
## NOTE
```
   For Nested Filtering please increase the count 
   export const MAX_NESTED_COUNT = 3;
   
   **Notion api is not working with nested filtering of level more than** 
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
            |-- config => theme config 
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
- [material-react-table] (https://www.material-react-table.com/) Both drag & drop and resizing feature is available

// previously using 
- [react-beautiful-dnd] (https://github.com/atlassian/react-beautiful-dnd)  implemented but not using 


### Sorting Video Clip
https://user-images.githubusercontent.com/62178420/227006425-1a4df9a4-1583-4146-8ebe-43a011a99d24.mov

### Filtering Video Clip
https://user-images.githubusercontent.com/62178420/227006824-8dda555c-680f-4b36-9035-0d39edd4a017.mov


## Drag & Drop and Resizing
https://user-images.githubusercontent.com/62178420/227007144-933676ba-efd8-41c2-bcea-7eda0c1a413b.mov





```
  Note: There are some bugs which can be solved but due to time constraint unable to do stretch target and unit test part
```
