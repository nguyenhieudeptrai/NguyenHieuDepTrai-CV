import avatar from 'images/selected.png';

const updated = "01/06/2021";

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
        description: "- Completed maintenance on existing programs\n- Build new functionality for software"
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
        description: '"Ostolust" webapp - Stores/Product managerment application'
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
        description: '"Smart Cabinet" system - Used for temporary storage of goods'
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
        description: "Build an app for real estate search, analysis and transactions, use Google Map"
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
        description: '"Traverlog" mobile aplication - Build a social app to search camping or traveling when you have free time and want to be go out, using Google Maps API.'
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
        description: '"The Second Life - power by Thunderstone" micro pages of webapp - search for clothes by brand in the chain\'s inventory and track the product by email or order it directly'
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