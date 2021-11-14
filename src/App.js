import React, { useState } from 'react';
import { Contact } from 'parts/Contact';
import { Education } from 'parts/Education';
import { Information } from 'parts/Information';
import { Experience } from 'parts/Experience';
import { Reference } from 'parts/Reference';
import { Skill } from 'parts/Skill';

function App() {
  const [itemIndex, setItemIndex] = useState({
    current: 0,
    last: 4,
  });

  const updated = "14/11/2021"
  const contacts = [
    {
      name: "phone",
      link: "tel:+84-963-192-405",
    },
    {
      name: "envelope",
      link: "mailto:yeumotnguoi789@gmail.com",
    },
    {
      name: "facebook-square",
      link: "https://www.facebook.com/style.in.my.eyes",
    },
  ]
  const profile = {
    name: "Nguyễn Hiếu",
    avatar: "https://scontent.fpnh22-4.fna.fbcdn.net/v/t1.6435-9/118139431_1730686400418708_5167623874361533360_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=H9Dsn9htSiQAX-XLGwb&tn=78f5E36gZxCZg_RD&_nc_ht=scontent.fpnh22-4.fna&oh=f08dde4e5de71cbbaeb72dd84dcc54ff&oe=61B82D8F",
    job: "Web/Mobile Deverloper",
    description: "",
  }
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

  const experience = [{
    companyName: "FPT Software",
    location: "Ho Chi Minh city",
    type: "Interm",
    from: "09/2019",
    to: "03/2020",
    jobs: [{
      name: "Deverlop BE",
      lang: "C#",
    }],
    description:"- Completed maintenance on existing programs\n- Build new functionality for software"
  }]

  const parts = [{
    name: "Educations",
    icon: "fa-graduation-cap",
    visible: true,
    component: <Education schools={education} />
  },
  {
    name: "Experiences",
    icon: "fa-exclamation-circle ",
    visible: true,
    component: <Experience experience={experience} />
  },
  {
    name: "Skills",
    icon: "fa-thumbs-up",
    visible: true,
    component: <Skill />
  },
  {
    name: "References",
    icon: "fa-bookmark",
    visible: true,
    component: <Reference />
  },
  {
    name: "None",
    visible: false,
  },
  ]
  return (
    <div className="w-screen h-screen bg-blue-500 overflow-scroll overflow-x-hidden">
      <div className="fixed h-4 w-full z-10">
        <div className="flex mx-12">
          <div className="flex flex-1 items-center uppercase">
            <p className="text-lg bold font-sans text-white">
              Profile
            </p>
          </div>
          <Contact contacts={contacts} />
        </div>
      </div>
      <div className="w-3/4 mx-auto h-screen">
        <div className="flex justify-center transform translate-y-20">
          <img src={profile.avatar} className="overflow-hidden w-40 rounded-full border-solid border-white border-2 -mt-3  shadow-xl" />
        </div>
        <div className=" bg-white rounded-xl p-4 pt-24">
          <Information profile={profile} />
        </div>
      </div>

      <div className="part2 relative h-screen">
        <div className="slider overflow-x-hidden">
          <div className="circular-slider">
            <div className="slides-holder" style={{
              transform: `rotateZ(${360 * itemIndex.current / 5 - 90}deg)`,
              transitionDuration: (Math.abs(itemIndex.last - itemIndex.current)) * 0.3 + "s"
            }}>
              {parts.map((val, index) => {
                if (val.visible) {
                  return (
                    <div key={index} className={`slides-holder__item ${itemIndex.current === index ? "slides-holder__item_active" : ""}`}
                      style={{
                        transform: `rotateZ(${-360 * index / 5}deg)`
                      }}>
                      <div className="bg-blue-500 slides-item" onFocus={() => {
                        console.log("mess");
                      }}
                        onClick={() => {
                          if (itemIndex.current !== index) {
                            setItemIndex((prev) => ({
                              current: index,
                              last: prev.current,
                            }));
                          }
                        }}>
                        <i className={`fa ${val.icon} text-2xl`}></i>
                      </div>
                    </div>
                  )
                } else {
                  return <div key={index} />
                }
              })}

            </div>
            <div className="descriptions">
              {parts.map((val, index) =>
                <div key={index} className={`descriptions__item ${itemIndex.current === index ? " descriptions__item_visible" : ""}`}>
                  <h1 className="text-white bold uppercase text-2xl">{val.name}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute h-full w-3/5 overflow-hidden">
          {parts.map((val, index) => {
            if (val.visible) {
              return (
                <div key={index} className={`absolute top-1/2 w-full transition duration-300 ease-in-out my-6 ml-4 bg-white rounded overflow-hidden shadow-lg
            ${itemIndex.current < index ? "content-detail_before" :
                    itemIndex.current === index ? "content-detail_active" :
                      itemIndex.current > index ? "content-detail_after" : ""}
            `}>
                  <div className="px-6 py-4  ">
                    {val.component}
                  </div>
                </div>
              )
            }
            else {
              return <div key={index} />
            }
          })}

        </div>

      </div>
      <div className="absolute bottom-0 right-0 px-10 py-2">
        <p className="text-white text-sm">Update {updated}</p>
      </div>
    </div >
  );
}

export default App;
