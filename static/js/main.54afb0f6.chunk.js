(this["webpackJsonpnguyenhieudeptrai-cv"]=this["webpackJsonpnguyenhieudeptrai-cv"]||[]).push([[0],{10:function(e,t,a){},12:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),i=a(5),c=a.n(i),r=(a(10),a(2)),o=a(4),l=a(0),d=function(e){var t=e.name,a=e.link,n=e.onClick,s=e.newPage,i=void 0!==s&&s;return Object(l.jsx)("a",{className:"cursor-pointer",href:a,target:i?"_blank":"_parent",rel:"noreferrer",onClick:function(){i||n()},children:Object(l.jsx)("i",{className:"fa fa-".concat(t," text-white text-2xl m-2.5")})})},m=function(e){var t=e.contacts,a=Object(n.useState)(),s=Object(r.a)(a,2),i=s[0],c=s[1];return Object(l.jsxs)("div",{className:"w-1/3 h-full flex flex-col md:self-auto self-center ",children:[Object(l.jsxs)("div",{className:"flex items-center justify-end",children:[Object(l.jsx)("p",{className:"text-md text-right bold font-sans text-white mr-4 md:block hidden",children:"Contacts"}),t.map((function(e){return Object(l.jsx)(d,Object(o.a)(Object(o.a)({},e),{},{onClick:function(){c(e.link),setTimeout((function(){c(void 0)}),3e4)}}),e.name)}))]}),i&&Object(l.jsx)("p",{className:"text-white text-right font-sans underline md:block hidden",children:i})]})},b=function(e){var t=e.tags,a=e.format,n=e.className,s=void 0===n?"":n;return Object(l.jsx)("div",{className:"flex flex-wrap ".concat(s),children:t.map((function(e,t){return Object(l.jsx)("div",{children:Object(l.jsxs)("span",{className:"block bg-gray-200 hover:bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",children:["#",a(e)]})},t)}))})},j=function(e){var t=e.name,a=e.className,n=void 0===a?"":a;return Object(l.jsx)("h3",{className:"uppercase font-bold text-base text-xl font-sans pb-1 border-b-2 ".concat(n),children:t})},h=function(e){var t=e.schools;return Object(l.jsxs)("div",{children:[Object(l.jsx)(j,{name:"Educations"}),t.map((function(e){return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"flex ",children:[Object(l.jsx)("p",{className:"font-bold font-sans",children:e.name}),Object(l.jsxs)("div",{className:"flex items-center ml-4",children:[Object(l.jsxs)("p",{className:"font-bold font-sans",children:["(",e.from]}),Object(l.jsx)("i",{className:"fa fa-long-arrow-right mx-3","aria-hidden":"true"}),Object(l.jsxs)("p",{className:"font-bold font-sans",children:[e.to,")"]})]})]}),Object(l.jsxs)("div",{className:"pl-6",children:[Object(l.jsxs)("div",{className:"flex ",children:[Object(l.jsx)("p",{className:"text-gray-700 text-base",children:"Major:"}),Object(l.jsx)("p",{className:"ml-3 text-gray-700 text-base",children:e.major})]}),Object(l.jsxs)("div",{className:"flex",children:[Object(l.jsx)("p",{className:"text-gray-700 text-base",children:"GPA:"}),Object(l.jsx)("p",{className:"ml-3 text-gray-700 text-base",children:e.gpa})]}),e.description&&Object(l.jsx)("p",{className:"ml-3 text-gray-700 text-base",children:e.description})]}),Object(l.jsx)(b,{className:"p-2",tags:e.majorType,format:function(e){return e}}),Object(l.jsxs)("div",{className:"",children:[Object(l.jsx)("p",{children:"Certificate:"}),e.certificates.map((function(e,t){return Object(l.jsxs)("div",{children:[Object(l.jsx)("i",{className:"fa fa-certificate text-yellow-500","aria-hidden":"true"}),Object(l.jsx)("a",{className:"ml-2 cursor-pointer text-green-500 font-bold text-base",href:e.link,target:"_blank",rel:"noreferrer",children:e.name})]},t)}))]})]},e.name)}))]})},x=function(e){var t=e.profile,a=e.isChangeAvatar,n=e.onScrollBottom;return Object(l.jsxs)("div",{className:"relative md:w-3/4 w-full mx-auto h-screen",children:[Object(l.jsx)("div",{className:"flex justify-center transform translate-y-20",children:Object(l.jsx)("img",{src:t.avatar,alt:"avatar",className:"overflow-hidden w-40 rounded-full border-solid border-white border-2 -mt-3 shadow-xl transition duration-500 ease-in-out "+(a?"opacity-0":"opacity-1")})}),Object(l.jsxs)("div",{className:"bg-white rounded-xl p-4 pt-24",children:[Object(l.jsxs)("div",{className:"text-center px-3 pb-6",children:[Object(l.jsx)("h3",{className:"text-xl bold font-roboto",children:t.name}),Object(l.jsxs)("p",{className:"mt-2 font-sans font-light",children:[t.job," - ",t.experience]})]}),Object(l.jsxs)("div",{className:"md:px-28 px-2",children:[Object(l.jsxs)("div",{className:"flex items-center",children:[Object(l.jsx)("i",{className:"fa fa-check mr-3 text-green-500","aria-hidden":"true"}),Object(l.jsxs)("p",{className:"font-roboto text-lg",children:["Gender:",Object(l.jsx)("span",{className:"ml-2 font-light",children:t.gender})]})]}),Object(l.jsxs)("div",{className:"flex items-center",children:[Object(l.jsx)("i",{className:"fa fa-check mr-3 text-green-500","aria-hidden":"true"}),Object(l.jsxs)("p",{className:"font-roboto text-lg",children:["Nationaity:",Object(l.jsx)("span",{className:"ml-2 font-light",children:t.region})]})]}),Object(l.jsxs)("div",{className:"flex items-center",children:[Object(l.jsx)("i",{className:"fa fa-check mr-3 text-green-500","aria-hidden":"true"}),Object(l.jsxs)("p",{className:"font-roboto text-lg",children:["Other Languages:",Object(l.jsx)("span",{className:"ml-2 font-light",children:t.otherLanguages.join(", ")})]})]}),t.description&&Object(l.jsx)("p",{className:"mt-2 font-sans font-light text-lg",children:t.description})]})]}),Object(l.jsx)("div",{className:"md:absolute md:bottom-6 w-full text-center hidden md:block",children:Object(l.jsxs)("button",{className:"relative m-auto",onClick:n,children:[Object(l.jsx)("i",{className:"fa fa-arrow-down text-white text-5xl animate-ping","aria-hidden":"true"}),Object(l.jsx)("i",{className:"fa fa-arrow-down text-white text-5xl absolute left-0","aria-hidden":"true"})]})})]})},p=function(e){var t=e.isCollapse,a=e.detailContent,s=void 0===a?[]:a,i=e.className,c=void 0===i?"":i,o=Object(n.useState)(!1),d=Object(r.a)(o,2),m=d[0],b=d[1];return Object(l.jsxs)("div",{className:"".concat(c),children:[Object(l.jsx)("div",{className:"".concat(m||t?"block":"hidden"),children:null===s||void 0===s?void 0:s.map((function(e,t){var a;return Object(l.jsxs)("div",{className:"mb-2",children:[Object(l.jsxs)("div",{className:"font-bold",children:["+ ",Object(l.jsx)("span",{className:"underline",children:e.title}),":"]}),Object(l.jsx)("div",{className:"ml-4",children:null===(a=e.lines)||void 0===a?void 0:a.map((function(e,t){return Object(l.jsxs)("p",{className:"",children:["- ",e]},"l".concat(t))}))})]},t)}))}),Object(l.jsxs)("button",{className:" border-2 rounded-md px-3 mb-2 ".concat(t?"bg-gray-200":"hover:border-black "),onClick:function(){return b(!m)},children:[Object(l.jsx)("span",{className:"mr-2",children:m||t?"Collapse":"View detail"}),m||t?Object(l.jsx)("i",{className:"fa fa-angle-up","aria-hidden":"true"}):Object(l.jsx)("i",{className:"fa fa-angle-down","aria-hidden":"true"})]})]})},f=function(e){var t=e.isCollapse,a=e.experience;return Object(l.jsxs)("div",{className:"",children:[Object(l.jsx)(j,{name:"Experiences"}),Object(l.jsxs)("div",{className:"flex mt-2",children:[Object(l.jsx)("div",{children:Object(l.jsx)("div",{className:"h-full w-1 bg-gray-300 timeline rounded"})}),Object(l.jsx)("div",{className:"flex flex-1 flex-col ml-4 mt-2",children:Object(l.jsx)("div",{className:"max-h-full",children:a.map((function(e,a){return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"flex items-center",children:[Object(l.jsx)("i",{className:"fa fa-circle -ml-5.5 absolute text-green-500","aria-hidden":"true"}),"C"===e.companyType&&Object(l.jsx)("i",{className:"fa fa-building mr-2","aria-hidden":"true"}),"F"===e.companyType&&Object(l.jsx)("i",{className:"fa fa-users mr-2","aria-hidden":"true"}),"G"===e.companyType&&Object(l.jsx)("i",{className:"fa fa-graduation-cap mr-2","aria-hidden":"true"}),Object(l.jsx)("p",{className:"font-bold font-sans",children:e.companyName}),Object(l.jsxs)("div",{className:"flex items-center ml-2",children:[Object(l.jsxs)("p",{className:"font-bold font-sans",children:["(",e.from]}),Object(l.jsx)("i",{className:"fa fa-long-arrow-right mx-3","aria-hidden":"true"}),Object(l.jsxs)("p",{className:"font-bold font-sans",children:[e.to,")"]})]})]}),Object(l.jsxs)("div",{children:[e.location&&Object(l.jsxs)("div",{className:"flex items-center ",children:[Object(l.jsx)("i",{className:"fa fa-map-marker text-red-500","aria-hidden":"true"}),Object(l.jsx)("p",{className:"pl-2 text-gray-700 text-base",children:e.location})]}),e.type&&Object(l.jsxs)("div",{className:"flex ",children:[Object(l.jsx)("p",{className:"ml-4 text-gray-700 text-base",children:"Position:"}),Object(l.jsx)("p",{className:"pl-2 text-gray-700 text-base",children:e.type})]}),e.description&&Object(l.jsx)("p",{className:"mt-2 whitespace-pre-wrap text-gray-700 text-base ",children:e.description})]}),Object(l.jsx)(b,{className:"p-2",tags:e.jobs,format:function(e){return"".concat(e.name," - ").concat(e.lang)}}),Object(l.jsx)(p,{detailContent:e.details,className:"ml-4",isCollapse:t})]},a)}))})})]})]})},u=function(){return Object(l.jsx)("div",{children:Object(l.jsx)(j,{name:"References"})})},g=function(e){var t=e.myself,a=e.softwares,n=e.others;return Object(l.jsxs)("div",{children:[Object(l.jsx)(j,{name:"Skills"}),Object(l.jsxs)("div",{className:"flex pt-4",children:[Object(l.jsxs)("div",{className:"flex flex-1 flex-col",children:[Object(l.jsx)("p",{className:"font-roboto font-bold border-b-2 border-green-800 w-4/5",children:"Myself"}),Object(l.jsx)("div",{children:t&&t.map((function(e){return Object(l.jsxs)("p",{className:"flex items-center",children:[Object(l.jsx)("i",{className:"fa fa-circle text-sm mr-2 text-yellow-500 ","aria-hidden":"true"}),e]},e)}))})]}),Object(l.jsxs)("div",{className:"flex flex-1 flex-col",children:[Object(l.jsx)("p",{className:"font-roboto font-bold border-b-2 border-green-800 w-4/5",children:"Softwares"}),Object(l.jsx)("div",{children:a&&a.map((function(e){return Object(l.jsxs)("p",{className:"flex items-center",children:[Object(l.jsx)("i",{className:"fa fa-circle text-sm mr-2 text-yellow-500 ","aria-hidden":"true"}),e]},e)}))})]}),Object(l.jsxs)("div",{className:"flex flex-1 flex-col",children:[Object(l.jsx)("p",{className:"font-roboto font-bold border-b-2 border-green-800 w-4/5",children:"Others"}),Object(l.jsx)("div",{children:n&&n.map((function(e){return Object(l.jsxs)("p",{className:"flex items-center",children:[Object(l.jsx)("i",{className:"fa fa-circle text-sm mr-2 text-yellow-500 ","aria-hidden":"true"}),e]},e)}))})]})]})]})},O=function(e){var t=e.parts,a=Object(n.useState)({current:0,last:4}),i=Object(r.a)(a,2),c=i[0],o=i[1],d=Object(n.useState)(!1),m=Object(r.a)(d,2),b=m[0],j=m[1];return Object(l.jsxs)("div",{className:"relative md:h-screen",children:[Object(l.jsx)("div",{className:"slider overflow-x-hidden md:block hidden",children:Object(l.jsxs)("div",{className:"circular-slider",children:[Object(l.jsx)("div",{className:"slides-holder",style:{transform:"rotateZ(".concat(360*c.current/5-90,"deg)"),transitionDuration:.3*Math.abs(c.last-c.current)+"s"},children:t.map((function(e,t){return function(e,t){return e.visible?Object(l.jsx)("div",{className:"slides-holder__item ".concat(c.current===t?"slides-holder__item_active":""),style:{transform:"rotateZ(".concat(-360*t/5,"deg)")},children:Object(l.jsxs)("div",{className:"bg-green-600 slides-item  ".concat(c.current!==t?"cursor-pointer":""),onClick:function(){c.current!==t&&o((function(e){return{current:t,last:e.current}}))},children:[Object(l.jsx)("div",{className:"".concat(c.current===t?"slides-item-bg animated-zoom ":"")}),Object(l.jsx)("i",{className:"fa ".concat(e.icon," text-3xl")})]})},t):Object(l.jsx)("div",{},t)}(e,t)}))}),Object(l.jsx)("div",{className:"descriptions",children:t.map((function(e,t){return Object(l.jsx)("div",{className:"descriptions__item ".concat(c.current===t?" descriptions__item_visible":""),children:Object(l.jsx)("h1",{className:"text-white bold uppercase text-2xl",children:e.name})},t)}))})]})}),Object(l.jsx)("div",{className:"relative h-full md:w-2/4 w-full lg:w-2/3",children:Object(l.jsx)("div",{className:"md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:h-3/4 w-full md:ml-4 md:overflow-hidden",children:t.map((function(e,t){return e.visible?Object(l.jsxs)("div",{className:"md:absolute md:top-1/2 h-auto md:max-h-full w-full transition duration-300 ease-in-out \n                                    bg-white rounded-lg shadow-xl overflow-auto mb-2\n                                    ".concat(c.current<t?"md:content-detail_before":c.current===t?"md:content-detail_active":c.current>t?"md:content-detail_after":"","\n                        "),children:[Object(l.jsx)("button",{className:"absolute top-3 right-3 z-10 md:block hidden",children:Object(l.jsxs)("label",{htmlFor:"extenseInput",className:"flex items-center cursor-pointer mb-4 md:mb-0",children:[Object(l.jsx)("span",{className:"mr-2 font-bold",children:"Extense all"}),Object(l.jsxs)("div",{className:"relative extenseAll",children:[Object(l.jsx)("input",{id:"extenseInput",type:"checkbox",className:"hidden",checked:b,onChange:function(){return j(!b)}}),Object(l.jsx)("div",{className:"toggle__line w-12 h-6 bg-gray-200 rounded-full shadow-inner"}),Object(l.jsx)("div",{className:"toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"})]})]})}),Object(l.jsx)("div",{className:"relative px-6 py-4",children:s.a.cloneElement(e.component,{isCollapse:b})})]},t):Object(l.jsx)("div",{},t)}))})})]})},v=function(e){var t=e.date,a=e.className,n=void 0===a?"":a;return Object(l.jsx)("div",{className:"md:absolute md:bottom-0 md:right-0 px-10 py-2 text-right w-full",children:Object(l.jsxs)("p",{className:"".concat(n),children:["Updated at ",t]})})},N=a.p+"static/media/selected.609ea5a2.png",w=[{name:"phone",link:"tel:+84-963-192-405",newPage:!1},{name:"envelope",link:"mailto:yeumotnguoi789@gmail.com",newPage:!1},{name:"facebook-square",link:"https://www.facebook.com/style.in.my.eyes",newPage:!0}],y={name:"Nguy\u1ec5n Trung Hi\u1ebfu",avatar:N,job:"Web/Mobile Deverloper",experience:"1 Year Experience",region:"Vietnam",gender:"Male",otherLanguages:["English"],description:"I have experience in developing web and mobile applications. I want to further develop my experience in big companies.\n    Orient my knowledge horizontally. So it is an advantage when deciding how to solve many problems."},C=[{name:"FPT University",location:"Ho Chi Minh city",major:"Software Engineer",majorType:["Website app","Desktop app","Mobile app"],from:"10/2016",to:"9/2021",gpa:"6.86",description:"",certificates:[{name:"Project Management Principles and Practices Specialization",link:"https://coursera.org/share/4ca0d06ef43d40e545cb1445630fb70a"}]}],k=[{companyName:"FPT Software",companyType:"C",location:"Ho Chi Minh city",type:"Intern",from:"09/2019",to:"03/2020",jobs:[{name:"Back-End",lang:"C# .Net Core"}],description:"- Completed maintenance on existing programs\n- Build new functionality for software",details:[{title:"Technical Knowledge",lines:["RabitMQ","Scheduler Quartz","SignalR - Websocket","Entity Framework Core - C# .Net Core 3.0 v s Dapper Mapping","Singleton pattern","MSSQL"]},{title:"Describe the job",lines:["Perform database queries and allocate events onto the Quartz Scheduler and then execute a lot subqueries at the same time with RabitMQ.","Create real-time connection with client through SignalR Socket (microsoft) for the purpose of increasing user experience."]}]},{companyName:"Freelance job",companyType:"F",from:"12/2020",to:"02/2021",jobs:[{name:"Front-End",lang:"ReactJs"}],description:'"Ostolust" webapp - Stores/Product managerment application',details:[{title:"Technical Knowledge",lines:["React Hook","React Redux - Redux Saga","React Context - State","Container pattern vs Provider pattern"]},{title:"Describe the job",lines:["Build a new app for a Store follows the template, use the built-in components","Create frames on the XDesign(Adobe) file","Filter products with some attributes","Call API by 'axios' and show list results in view"]}]},{companyName:"Capstone Project - FPT University",companyType:"G",from:"01/2020",to:"04/2021",jobs:[{name:"Mobile",lang:"React Native"},{name:"Back-End",lang:"C# .Net Core"},{name:"Front-End",lang:"ReactJs"},{name:"Embedded",lang:"C lang"}],description:'"Smart Cabinet" system - Used for temporary storage of goods',details:[{title:"Technical Knowledge (Back-end)",lines:["Test API","Authorize with JWT","Filter in middleware","Micro-Service pattern vs Pub-sub pattern","Google APIs","MS Azure Server","Adafruit IO","Momo Wallet API"]},{title:"Describe the job (Back-end)",lines:["Create REST-full api for manage users and bookings","Create template tructrure box for Cabinet by coordinate position number and numbers box","Create REST-full api for handle event of user and 'Cabinet' in each micro-services","Detech devices working (publisher - subscriber) by using Adapfruit Socket API and send command-messages to the define device"]},{title:"Technical Knowledge (Front-end - mobile - smart screen)",lines:["React Native","Expo platform","Momo Wallet Payment API","Unit test"]},{title:"Describe the job (Front-end - mobile - smart screen)",lines:["Create aplication for mobile with big screen","Design simple UI for descript number of Box in screen to user press and confirm or booking a box of that cabinet","Create the code QR of Momo payment for booking"]},{title:"Technical Knowledge (Front-end - mobile - phone)",lines:["React Native","Google Authentication","Google Maps API","Momo Wallet Payment App","Unit test"]},{title:"Describe the job (Front-end - mobile - phone)",lines:["Appy the authentication by Google","Design UI mobile and create a method generate graphic to user knows position of box in the cabinet that user chose","Apply Momo Payment in mobile for user excuses immediately","Create function to send directly command for maintaince man to fix the cabinet by bluetooth"]},{title:"Technical Knowledge (Embedded)",lines:["Arduino device-connections","Adafruit Embedded","Network control"]},{title:"Describe the job (Embedded)",lines:["Create mainboard from Kits Arduino","Create method for connect to Adapfruit IO in real-time by Wifi","Create method for maintaince man open by hand by bluetooth"]}]},{companyName:"Freelance job",companyType:"F",from:"06/2021",to:"07/2021",jobs:[{name:"Front-End",lang:"ReactJs"}],description:"Build an app for real estate search, analysis and transactions, use Google Map",details:[{title:"Technical Knowledge",lines:["Unit Test","Google Map in web"]},{title:"Describe the job",lines:["Maintain UI for the description pages and search pages, responsive for app and fix bugs","Add some view for detail contents","Apply google map search locations in view"]}]},{companyName:"Freelance job",companyType:"F",from:"10/2021",to:"03/2022",jobs:[{name:"Front-End",lang:"React Native"}],description:'"Traverlog" mobile aplication - Build a social app to search camping or traveling when you have free time and want to be go out, using Google Maps API.',details:[{title:"Technical Knowledge",lines:["React Native - Expo platform","React Typescript","Publish app to App Store and Google Play","Authentication with Auth0 custom view","Component Pattern","Animation UI","Unit test"]},{title:"Describe the job",lines:["Create a mobile in Expo platfrom with authen by Auth0","Create a lot animation with Animation UI for each Icons and Event when user press and moving like 'Tinder'","Optimize performent for aminations","Design UX/UI for Plat Cards Layer","Add some view for detail contents","Apply google map custom for direct directions in app"]}]},{companyName:"Freelance job",companyType:"F",from:"11/2021",to:"05/2022",jobs:[{name:"Front-End",lang:"ReactJs"}],description:'"The Second Life - power by Thunderstone" micro pages of webapp - search for clothes by brand in the chain\'s inventory and track the product by email or order it directly',details:[{title:"Technical Knowledge",lines:["React Typescript","SCSS","Component pattern vs Part View pattern","Tailwind CSS"]},{title:"Describe the job",lines:["Create views from the XDesign file","Apply dynamic theme for each user","Apply authen JWT of Server and Auth0 custom","Create modal and notification slide for app","Create responsive"]}]}],S={myself:["Project Management","Software Development","Process improvement","Teamwork"],software:["Visual Studio","Visual Studio Code","Android Studio","IntelliJ IDEA","Git base/UI"],other:["Photoshop","Illustrator","XDesign","Sketch","Blender"]},T=s.a.createRef(),A=0;var P=function(){var e=[{name:"Experiences",icon:"fa-exclamation-circle ",visible:!0,component:Object(l.jsx)(f,{experience:k})},{name:"Educations",icon:"fa-graduation-cap",visible:!0,component:Object(l.jsx)(h,{schools:C})},{name:"Skills",icon:"fa-thumbs-up",visible:!0,component:Object(l.jsx)(g,{myself:S.myself,softwares:S.software,others:S.other})},{name:"References",icon:"fa-bookmark",visible:!0,component:Object(l.jsx)(u,{})},{name:"None",visible:!1}],t=Object(n.useState)(!1),a=Object(r.a)(t,2),s=a[0],i=a[1],c=Object(n.useState)(0),o=Object(r.a)(c,2),d=o[0],b=o[1];Object(n.useEffect)((function(){window.innerWidth<=768&&(A=6,j())}),[]);var j=function e(){A<=0?b(0):(A--,b(A),setTimeout(e,1e3))};return d>0?Object(l.jsx)("div",{className:"w-screen h-screen bg-gray-500 flex items-center justify-center",children:Object(l.jsxs)("div",{className:"flex flex-col items-center",children:[Object(l.jsx)("p",{className:" text-white text-center",children:"It will be better if you watch it on your PC/Laptop"}),Object(l.jsxs)("p",{className:"pb-2 text-white text-center",children:[d,"s to auto skip"]}),Object(l.jsx)("button",{className:"px-6 py-2 text-white mt-4 bg-green-300 rounded-lg",onClick:function(){A=0},children:"Continue"})]})}):Object(l.jsxs)("div",{className:"w-screen h-screen bg-green-600 overflow-y-auto overflow-x-hidden",ref:T,onScroll:function(){var e,t=null===(e=T.current)||void 0===e?void 0:e.scrollTop;i(t>=200)},children:[Object(l.jsx)("div",{className:"fixed w-full z-10 "+(s?"bg-green-600 md:bg-transparent ":""),children:Object(l.jsxs)("div",{className:"flex md:mx-12 mx-2",children:[Object(l.jsxs)("div",{className:"flex flex-1 items-center z-10",children:[!s&&Object(l.jsx)("p",{className:"absolute text-lg font-bold font-roboto text-white uppercase ",children:"Profile"}),Object(l.jsxs)("div",{className:"flex items-center justify-center rounded-lg py-1 px-3 "+(s?"border-solid border-white border-2 bg-green-600 mt-0.5":""),children:[Object(l.jsx)("img",{src:y.avatar,alt:"avatar",className:"overflow-hidden h-16 w-16 rounded-full border-solid border-white border-2 shadow-xl transition duration-500 ease-in-out "+(s?"opacity-1":"opacity-0")}),s&&Object(l.jsxs)("div",{className:"ml-3 flex flex-col items-start",children:[Object(l.jsx)("h3",{className:"text-white text-lg font-bold font-roboto",children:y.name}),Object(l.jsx)("p",{className:"text-white text-sm font-sans font-light",children:y.job})]})]})]}),Object(l.jsx)(m,{contacts:w})]})}),Object(l.jsx)(x,{profile:y,isChangeAvatar:s,onScrollBottom:function(){var e;null===(e=T.current)||void 0===e||e.scrollTo({left:0,top:2*window.innerHeight,behavior:"smooth"})}}),Object(l.jsx)(O,{parts:e}),Object(l.jsx)(v,{date:"03/06/2021",className:"text-white text-sm"})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(P,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[12,1,2]]]);
//# sourceMappingURL=main.54afb0f6.chunk.js.map