import avatar from 'images/selected.png';

const updated = "03/06/2021";

const contacts = [
    {
        name: "phone",
        link: "tel:+84-963-192-405",
        newPage: false,
    },
    {
        name: "envelope",
        link: "mailto:yeumotnguoi789@gmail.com",
        newPage: false,
    },
    {
        name: "facebook-square",
        link: "https://www.facebook.com/style.in.my.eyes",
        newPage: true,
    },
];
const profile = {
    name: "Nguyễn Trung Hiếu",
    avatar: avatar,
    job: "Web/Mobile Deverloper",
    experience: "1 Year Experience",
    region: "Vietnam",
    gender: "Male",
    otherLanguages: [
        "English",
    ],
    description: `I have experience in developing web and mobile applications. I want to further develop my experience in big companies.
    Orient my knowledge horizontally. So it is an advantage when deciding how to solve many problems.`,
};

const education = [{
    name: "FPT University",
    location: "Ho Chi Minh city",
    major: "Software Engineer",
    majorType: [
        "Website app",
        "Desktop app",
        "Mobile app",
    ],
    from: "10/2016",
    to: "9/2021",
    gpa: "6.86",
    description: "",
    certificates: [
        {
            name: "Project Management Principles and Practices Specialization",
            link: "https://coursera.org/share/4ca0d06ef43d40e545cb1445630fb70a"
        }
    ]
}];

const experience = [
    {
        companyName: "FPT Software",
        companyType: "C",// F or C or G
        location: "Ho Chi Minh city",
        type: "Intern",
        from: "09/2019",
        to: "03/2020",
        jobs: [{
            name: "Back-End",
            lang: "C# .Net Core",
        }],
        description: "- Completed maintenance on existing programs\n- Build new functionality for software",
        details: [
            {
                title: "Technical Knowledge",
                lines: [
                    "RabitMQ",
                    "Scheduler Quartz",
                    "SignalR - Websocket",
                    "Entity Framework Core - C# .Net Core 3.0 v s Dapper Mapping",
                    "Singleton pattern",
                    "MSSQL"
                ]
            },
            {
                title: "Describe the job",
                lines: [
                    "Perform database queries and allocate events onto the Quartz Scheduler and then execute a lot subqueries at the same time with RabitMQ.",
                    "Create real-time connection with client through SignalR Socket (microsoft) for the purpose of increasing user experience."
                ]
            }
        ]
    },
    {
        companyName: "Freelance job",
        companyType: "F",// F or C or G
        from: "12/2020",
        to: "02/2021",
        jobs: [{
            name: "Front-End",
            lang: "ReactJs",
        }],
        description: '"Ostolust" webapp - Stores/Product managerment application',
        details: [
            {
                title: "Technical Knowledge",
                lines: [
                    "React Hook",
                    "React Redux - Redux Saga",
                    "React Context - State",
                    "Container pattern vs Provider pattern"
                ]
            },
            {
                title: "Describe the job",
                lines: [
                    "Build a new app for a Store follows the template, use the built-in components",
                    "Create frames on the XDesign(Adobe) file",
                    "Filter products with some attributes",
                    "Call API by 'axios' and show list results in view"
                ]
            }
        ]
    },
    {
        companyName: "Capstone Project - FPT University",
        companyType: "G",// F or C or G
        from: "01/2020",
        to: "04/2021",
        jobs: [
            {
                name: "Mobile",
                lang: "React Native",
            },
            {
                name: "Back-End",
                lang: "C# .Net Core",
            },
            {
                name: "Front-End",
                lang: "ReactJs",
            },
            {
                name: "Embedded",
                lang: "C lang",
            }
        ],
        description: '"Smart Cabinet" system - Used for temporary storage of goods',
        details: [
            {
                title: "Technical Knowledge (Back-end)",
                lines: [
                    "Test API",
                    "Authorize with JWT",
                    "Filter in middleware",
                    "Micro-Service pattern vs Pub-sub pattern",
                    "Google APIs",
                    "MS Azure Server",
                    "Adafruit IO",
                    "Momo Wallet API",
                ]
            },
            {
                title: "Describe the job (Back-end)",
                lines: [
                    "Create REST-full api for manage users and bookings",
                    "Create template tructrure box for Cabinet by coordinate position number and numbers box",
                    "Create REST-full api for handle event of user and 'Cabinet' in each micro-services",
                    "Detech devices working (publisher - subscriber) by using Adapfruit Socket API and send command-messages to the define device",
                ]
            },
            {
                title: "Technical Knowledge (Front-end - mobile - smart screen)",
                lines: [
                    "React Native",
                    "Expo platform",
                    "Momo Wallet Payment API",
                    "Unit test",
                ]
            },
            {
                title: "Describe the job (Front-end - mobile - smart screen)",
                lines: [
                    "Create aplication for mobile with big screen",
                    "Design simple UI for descript number of Box in screen to user press and confirm or booking a box of that cabinet",
                    "Create the code QR of Momo payment for booking"
                ]
            },
            {
                title: "Technical Knowledge (Front-end - mobile - phone)",
                lines: [
                    "React Native",
                    "Google Authentication",
                    "Google Maps API",
                    "Momo Wallet Payment App",
                    "Unit test",
                ]
            },
            {
                title: "Describe the job (Front-end - mobile - phone)",
                lines: [
                    "Appy the authentication by Google",
                    "Design UI mobile and create a method generate graphic to user knows position of box in the cabinet that user chose",
                    "Apply Momo Payment in mobile for user excuses immediately",
                    "Create function to send directly command for maintaince man to fix the cabinet by bluetooth"
                ]
            },
            {
                title: "Technical Knowledge (Embedded)",
                lines: [
                    "Arduino device-connections",
                    "Adafruit Embedded",
                    "Network control"
                ]
            },
            {
                title: "Describe the job (Embedded)",
                lines: [
                    "Create mainboard from Kits Arduino",
                    "Create method for connect to Adapfruit IO in real-time by Wifi",
                    "Create method for maintaince man open by hand by bluetooth",
                ]
            }
        ]
    },
    {
        companyName: "Freelance job",
        companyType: "F",// F or C or G
        from: "06/2021",
        to: "07/2021",
        jobs: [{
            name: "Front-End",
            lang: "ReactJs",
        }],
        description: "Build an app for real estate search, analysis and transactions, use Google Map",
        details: [
            {
                title: "Technical Knowledge",
                lines: [
                    "Unit Test",
                    "Google Map in web",
                ]
            },
            {
                title: "Describe the job",
                lines: [
                    "Maintain UI for the description pages and search pages, responsive for app and fix bugs",
                    "Add some view for detail contents",
                    "Apply google map search locations in view"
                ]
            },
        ]
    },
    {
        companyName: "Freelance job",
        companyType: "F",// F or C or G
        from: "10/2021",
        to: "03/2022",
        jobs: [{
            name: "Front-End",
            lang: "React Native",
        }],
        description: '"Traverlog" mobile aplication - Build a social app to search camping or traveling when you have free time and want to be go out, using Google Maps API.',
        details: [
            {
                title: "Technical Knowledge",
                lines: [
                    "React Native - Expo platform",
                    "React Typescript",
                    "Publish app to App Store and Google Play",
                    "Authentication with Auth0 custom view",
                    "Component Pattern",
                    "Animation UI",
                    "Unit test",
                ]
            },
            {
                title: "Describe the job",
                lines: [
                    "Create a mobile in Expo platfrom with authen by Auth0",
                    "Create a lot animation with Animation UI for each Icons and Event when user press and moving like 'Tinder'",
                    "Optimize performent for aminations",
                    "Design UX/UI for Plat Cards Layer",
                    "Add some view for detail contents",
                    "Apply google map custom for direct directions in app"
                ]
            },
        ]
    },
    {
        companyName: "Freelance job",
        companyType: "F",// F or C or G
        from: "11/2021",
        to: "05/2022",
        jobs: [{
            name: "Front-End",
            lang: "ReactJs",
        }],
        description: '"The Second Life - power by Thunderstone" micro pages of webapp - search for clothes by brand in the chain\'s inventory and track the product by email or order it directly',
        details: [
            {
                title: "Technical Knowledge",
                lines: [
                    "React Typescript",
                    "SCSS",
                    "Component pattern vs Part View pattern",
                    "Tailwind CSS"
                ]
            },
            {
                title: "Describe the job",
                lines: [
                    "Create views from the XDesign file",
                    "Apply dynamic theme for each user",
                    "Apply authen JWT of Server and Auth0 custom",
                    "Create modal and notification slide for app",
                    "Create responsive"
                ]
            },
        ]
    },

];

const skill = {
    myself: [
        "Project Management",
        "Software Development",
        "Process improvement",
        "Teamwork"
    ],
    software: [
        "Visual Studio",
        "Visual Studio Code",
        "Android Studio",
        "IntelliJ IDEA",
        "Git base/UI",
    ],
    other: [
        "Photoshop",
        "Illustrator",
        "XDesign",
        "Sketch",
        "Blender"
    ]
}

export {
    updated, contacts, education, experience, profile, skill
}