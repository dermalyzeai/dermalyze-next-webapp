import styles from './about.module.css';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const About = () => {
  const sections = [
    {
      title: 'Our Inspiration',
      content: 'AI and machine learning models have tremendously grown in usage due to their advancements in computing power. More and more, the open-source AI community continues to grow and these advanced models are reaching even the hands of hobbyists. Our inspiration for this project comes from the growth of this new technology; we want to create our own model that will detect and identify skin conditions and recommend treatments based off of that. This project also serves as a great learning experience of the both of us.',
    },
    {
      title: 'What It Does',
      content: 'Our model takes a picture of skin and sends that to a machine learning model, which analyzes it for any skin conditions. We feed our model with a bunch of images from a database containing images of certain skin conditions. These labeled images help train the model on what to look for, and when it notices a pattern from what it has seen in training images on a brand new image, then it recognizes which skin condition it could be.',
    },
    {
      title: "What's Next For Dermalyze",
      content: 'We would like to continue developing our model by making the training and pre-processing steps more optimal. We intend to keep this app as accessible as possible because we found that many of the AIs out there are locked behind a paywall. By keeping our app free, we can increase awareness about existing solutions. To maintain our project’s sustainability, we can look into using affiliate links, such as Amazon, to provide users with links to buy products instead of just stating them, allowing us to pocket some money to invest in keeping a server online.',
    },
  ];

  const teamMembers = [
    {
      name: 'Neelesh Chevuri',
      jobTitle: 'Founder & CTO',
      description: 'Neelesh is passionate about artificial intelligence and its applications in everyday life. With a background in computer science, he leads the development of Dermalyze and its technology.',
      image: '../assets/ProfileImages/neelesh-1400x1866.png', // Replace with actual image path
      instagram: 'https://instagram.com/cyber_neel',
      github: 'https://github.com/cyberneel',
    },
    {
      name: 'Adway Kulkarni',
      jobTitle: 'Medical Researcher',
      description: 'Adway is passionate about the medical field and he spends a lot of time researching diseases and remedies. Adway leads the medical side of Dermalyze, researching common skin diseases and writing informative posts.',
      image: '../assets/ProfileImages/adway-close.png',
      instagram: 'https://www.instagram.com/budwayk/',
    },
    {
      name: 'Sameer Agarwal',
      jobTitle: 'Website Development',
      description: 'Sameer is passionate about computer science and developing web applications. At Dermalyze, he leads the development of the website, implementing the AI model and other critical features.',
      image: '../assets/ProfileImages/sameer.jpg',
      instagram: 'https://www.instagram.com/sam.eer.agarwal/',
      github: 'https://github.com/Elitelord',
    },
    {
      name: 'Murtaza Haque',
      jobTitle: 'Data & Marketing',
      description: 'Murtaza is passionate about mathematics and machine learning, he spends time researching machine learning techniques. Murtaza has compiled large portions of the dataset which Dermalyze uses.',
      image: '../assets/ProfileImages/murtaza.jpg',
      instagram: 'https://www.instagram.com/murtazahaque/',
      github: 'https://github.com/TheDarkLynx786',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.titleCentered}>About Dermalyze</h1>

      <div className={styles.grid}>
        {sections.map((section, index) => (
          <details key={index} className={styles.sectionBox}>
            <summary className={styles.titleCentered}>{section.title}</summary>
            <p>{section.content}</p>
          </details>
        ))}
      </div>

      <h1 className={styles.titleCentered} id='team'>Meet the Team</h1>

      <div className={styles.grid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamCard}>
            <div className={styles.teamCardImage}>
              <img
                src={member.image}
                alt={member.name}
                className={styles.memberImage}
              />
            </div>
            <div className={styles.teamCardContent}>
              <h5 className={styles.cardTitle}>{member.name}</h5>
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <FaInstagram />
                </a>
              )}
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <FaGithub />
                </a>
              )}
              <p>{member.jobTitle}</p>
              <p>{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
