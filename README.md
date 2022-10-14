# godhan-ui
Repository to house the UI Code

# Project Setup
install ionic: npm install -g @ionic/cli
1. git clone <project name>
2. cd godhan-ui
3. npm install
4. ionic serve or npm start
5. open localhost:8100/dashboard in your browser
  
# To deploy as Android/ios
1. ionic build
2. ionic cap add android/iso
3. npm run resources - to generate android/ios resources
4. npx cap open android
5. install android studio and connect your mobile to simulate/install apk directly into ur mobile.
 6.

# To sync once android ios project created
1. We have three code bases now, and now we need to push ios and android code bases as well to git.
2. ionic cap sync android/ios : to sync the changes to android/ios
3. use File->sync gradle in android studio to get changes updated
  
# To Deploy as PWA
1. Run Script `npm run firebase:deploy` 
2. Go to URL `https://godhan-ui.web.app/`

In case script fails, `npm install -g firebase-tools` and follow https://ionicframework.com/docs/react/pwa
  
# Project structure
PROJECT ROOT  
<pre>
|--public    
   |--stubs     // for the json stubs to return mock response  
|--src  
   |--assets  
      |--styles // contains all css files with a common import  
   |--commons   // contains common wrappers such as axios wrapper  
   |--components// contains the smallest to biggest reusable components with scope for expanding into   
   |                   // sandbox and widget components  
   |--router      
      |--pages  // contains the pages, which inturn contains widgets  
      |--routing// contains the routing path and the component(page) to be routed to  
   |--services  // contains redux configuration and the reducers, actions, etc.  
   |--utils     // contains contentFormatters, date formatters, etc  
   |--widgets   // aggregated to make a page  
 </pre>
 
# Technology
1. Project uses React, Redux, with capability to handle both class-based and functional components.
2. Axios for interacting with the API
3. Ionic components/framework for hybrid capabilities
4. Redux-Thunk for middleware
5. Redux-logger for logging actions

### References
https://ionicframework.com/
https://redux.js.org/
  

