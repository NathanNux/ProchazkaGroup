import SVGButton from "@/components/Sticky/buttons/SvgButton"
import Image from "next/image"
import { Fragment, useMemo, useRef, useState } from "react"
import { useScroll, motion, useTransform, AnimatePresence } from "framer-motion";
import Footer from "../Footer";
import CustomImage from "@/components/Sticky/images";
import RoundButton from "@/components/Sticky/buttons/RoundButton";
import SmallButton from "@/components/Sticky/buttons/SmallButton";

const BlogPostData = [
  {
    header: 'Understanding Financial Planning',
    number: '01',
    content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />

        <dot/>Key Components of Financial Planning<br />
        <sub/>Budgeting: Track income and expenses<br />
        <sub/>Saving: Build emergency funds and long-term wealth<br />
        <sub/>Investing: Grow your money over time<br />
        <sub/>Risk Management: Protect your assets with insurance<br />
        <sub/>Tax Planning: Optimize your tax situation<br />
        <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
        
        A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
        
        <dot/>Steps to Create a Financial Plan<br />
        <sub/>1. Set clear, measurable financial goals<br />
        <sub/>2. Assess your current financial situation<br />
        <sub/>3. Create a realistic budget<br />
        <sub/>4. Develop a debt repayment strategy<br />
        <sub/>5. Build an emergency fund<br />
        <sub/>6. Invest for the future<br />
        <sub/>7. Review and adjust your plan regularly<br /><br />
        
        Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
    alt: '',
    src: '',
    styles: {
      // Add any custom styles here
    },
},
  {
    header: 'The Importance of Emergency Funds',
    number: '02',
    content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />

        <dot/>What is an Emergency Fund?<br />
        An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
        
        <dot/>Why is an Emergency Fund Important?<br />
        <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
        <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
        <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
        <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
        
        <dot/>How Much Should You Save?<br />
        Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
        <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
        <sub/>Family Size: Larger families might require more substantial savings<br />
        <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
        
        <dot/>Building Your Emergency Fund<br />
        <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
        <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
        <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
        <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
        <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
        
        Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
    alt: 'image_1',
    src: '/assets/reviewsBackground.png',
    styles: {
      // Add any custom styles here
    },
  },
  {
    header: 'Understanding Financial Planning',
    number: '03',
    content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />
    
    <dot/>Key Components of Financial Planning<br />
    <sub/>Budgeting: Track income and expenses<br />
    <sub/>Saving: Build emergency funds and long-term wealth<br />
    <sub/>Investing: Grow your money over time<br />
    <sub/>Risk Management: Protect your assets with insurance<br />
    <sub/>Tax Planning: Optimize your tax situation<br />
    <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
    
    A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
    
    <dot/>Steps to Create a Financial Plan<br />
    <sub/>1. Set clear, measurable financial goals<br />
    <sub/>2. Assess your current financial situation<br />
    <sub/>3. Create a realistic budget<br />
    <sub/>4. Develop a debt repayment strategy<br />
    <sub/>5. Build an emergency fund<br />
    <sub/>6. Invest for the future<br />
    <sub/>7. Review and adjust your plan regularly<br /><br />
    
    Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
    alt: 'Comprehensive financial planning illustration',
    src: '',
    styles: {
      // Add any custom styles here
    },
  },
  {
    header: 'The Importance of Emergency Funds',
    number: '04',
    content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />

    <dot/>What is an Emergency Fund?<br />
    An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
    
    <dot/>Why is an Emergency Fund Important?<br />
    <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
    <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
    <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
    <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
    
    <dot/>How Much Should You Save?<br />
    Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
    <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
    <sub/>Family Size: Larger families might require more substantial savings<br />
    <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
    
    <dot/>Building Your Emergency Fund<br />
    <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
    <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
    <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
    <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
    <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
    
    Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
    alt: 'Emergency fund savings concept',
    src: '',
    styles: {
      // Add any custom styles here
    },
  },
  {
    header: 'Understanding Financial Planning',
    number: '05',
    content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />

    <dot/>Key Components of Financial Planning<br />
    <sub/>Budgeting: Track income and expenses<br />
    <sub/>Saving: Build emergency funds and long-term wealth<br />
    <sub/>Investing: Grow your money over time<br />
    <sub/>Risk Management: Protect your assets with insurance<br />
    <sub/>Tax Planning: Optimize your tax situation<br />
    <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
    
    A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
    
    <dot/>Steps to Create a Financial Plan<br />
    <sub/>1. Set clear, measurable financial goals<br />
    <sub/>2. Assess your current financial situation<br />
    <sub/>3. Create a realistic budget<br />
    <sub/>4. Develop a debt repayment strategy<br />
    <sub/>5. Build an emergency fund<br />
    <sub/>6. Invest for the future<br />
    <sub/>7. Review and adjust your plan regularly<br /><br />
    
    Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
    alt: 'Comprehensive financial planning illustration',
    src: '',
    styles: {
      // Add any custom styles here
    },
  },
  {
    header: 'The Importance of Emergency Funds',
    number: '06',
    content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />

    <dot/>What is an Emergency Fund?<br />
    An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
    
    <dot/>Why is an Emergency Fund Important?<br />
    <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
    <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
    <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
    <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
    
    <dot/>How Much Should You Save?<br />
    Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
    <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
    <sub/>Family Size: Larger families might require more substantial savings<br />
    <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
    
    <dot/>Building Your Emergency Fund<br />
    <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
    <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
    <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
    <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
    <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
    
    Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
    alt: 'Emergency fund savings concept',
    src: '',
    styles: {
      // Add any custom styles here
    },
  },
  {
    header: 'Understanding Financial Planning',
    number: '07',
    content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />

    <dot/>Key Components of Financial Planning<br />
    <sub/>Budgeting: Track income and expenses<br />
    <sub/>Saving: Build emergency funds and long-term wealth<br />
    <sub/>Investing: Grow your money over time<br />
    <sub/>Risk Management: Protect your assets with insurance<br />
    <sub/>Tax Planning: Optimize your tax situation<br />
    <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
    
    A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
    
    <dot/>Steps to Create a Financial Plan<br />
    <sub/>1. Set clear, measurable financial goals<br />
    <sub/>2. Assess your current financial situation<br />
    <sub/>3. Create a realistic budget<br />
    <sub/>4. Develop a debt repayment strategy<br />
    <sub/>5. Build an emergency fund<br />
    <sub/>6. Invest for the future<br />
    <sub/>7. Review and adjust your plan regularly<br /><br />
    
    Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
    alt: 'Comprehensive financial planning illustration',
    src: '',
    styles: {
      // Add any custom styles here
    },
  },
  {
    header: 'The Importance of Emergency Funds',
    number: '08',
    content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />

    <dot/>What is an Emergency Fund?<br />
    An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
    
    <dot/>Why is an Emergency Fund Important?<br />
    <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
    <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
    <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
    <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
    
    <dot/>How Much Should You Save?<br />
    Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
    <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
    <sub/>Family Size: Larger families might require more substantial savings<br />
    <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
    
    <dot/>Building Your Emergency Fund<br />
    <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
    <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
    <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
    <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
    <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
    
    Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
    alt: 'Emergency fund savings concept',
    src: '',
    styles: {
      // Add any custom styles here
    },
  }
]

const data = [
    {
        time: '10min',
        data: '',
        src: '/thumbsUp.svg',
        alt: 'book__icon'
    },
    {
        time: '',
        data: '1928',
        src: '/thumbsUp.svg',
        alt: 'views__icon'
    },
    {
        time: '',
        data: '428',
        src: '/thumbsUp.svg',
        alt: 'Likes__icon'
    },
    {
        time: '',
        data: '28',
        src: '/thumbsUp.svg',
        alt: 'Comments__icon'
    }
]

const blogIntro = {
    content: `Welcome to our comprehensive guide on personal finance and wealth management. In this blog series, we'll explore various aspects of financial planning and strategies to help you achieve your financial goals.<br /><br />
  
    Financial literacy is crucial in today's complex economic landscape. Whether you're just starting your career or planning for retirement, understanding how to manage your money effectively can make a significant difference in your financial well-being.<br /><br />
  
    Throughout this series, we'll cover topics ranging from budgeting and saving to investing and risk management. Our goal is to provide you with practical, actionable advice that you can apply to your own financial situation.<br /><br />
  
    Let's embark on this journey towards financial empowerment together. Remember, the path to financial success starts with a single step – and that step is education.`
};

const comments = [
  {
    name: "Jan Novák",
    number: '01',
    hashtag: 'comments',
    content: "Skvělý článek! Velmi užitečné informace pro každého, kdo se zajímá o finanční plánování.",
    likes: '35'
  },
  {
    name: "Marie Svobodová",
    number: '02',
    hashtag: 'comments',
    content: "Díky za tyto cenné rady. Určitě je využiji při svém finančním plánování.",
    likes: '12'
  },
  {
    name: "Petr Novotný",
    number: '03',
    hashtag: 'comments',
    content: "Tohle by měl číst každý. Finanční gramotnost je v dnešní době nesmírně důležitá.",
    likes: '234'
  },
  {
    name: "Anna Dvořáková",
    number: '04',
    hashtag: 'comments',
    content: "Velmi dobře napsané a srozumitelné i pro laiky. Děkuji za sdílení!",
    likes: '98'
  },
  {
    name: "Tomáš Procházka",
    number: '05',
    hashtag: 'comments',
    content: "Zajímavé postřehy o emergency fondech. Určitě se nad tím zamyslím.",
    likes: '46'
  },
  {
    name: "Lucie Černá",
    number: '06',
    hashtag: 'comments',
    content: "Skvělé tipy na investování. Můžete prosím napsat více o ETF?",
    likes: '2'
  },
  {
    name: "Martin Kučera",
    number: '07',
    hashtag: 'comments',
    content: "Tohle by se mělo učit ve školách. Díky za sdílení těchto důležitých informací.",
    likes: '6'
  },
  {
    name: "Eva Marková",
    number: '08',
    hashtag: 'comments',
    content: "Velmi praktické rady. Už se těším na další články z této série!",
    likes: '54'
  },
  {
    name: "Jakub Veselý",
    number: '09',
    hashtag: 'comments',
    content: "Konečně někdo, kdo vysvětluje finanční plánování jednoduše a srozumitelně.",
    likes: '68'
  },
  {
    name: "Kateřina Němcová",
    number: '10',
    hashtag: 'comments',
    content: "Skvělé shrnutí základů finančního plánování. Určitě budu sdílet s přáteli.",
    likes: '32'
  },
  {
    name: "David Horák",
    number: '11',
    hashtag: 'comments',
    content: "Velmi užitečné informace. Rád bych se dozvěděl více o daňové optimalizaci.",
    likes: '21'
  },
  {
    name: "Zuzana Pokorná",
    number: '12',
    hashtag: 'comments',
    content: "Děkuji za tento článek. Pomohl mi uvědomit si důležitost dlouhodobého finančního plánování.",
    likes: '65'
  }
];

const icons = [
    { name: "facebook", src: "/thumbsUp.png" },
    { name: "instagram", src: "/thumbsUp.png" },
    { name: "linkedin", src: "/thumbsUp.png" },
    { name: "twitter", src: "/thumbsUp.png" },
    { name: "youtube", src: "/thumbsUp.png" },
    { name: "mainWeb", src: "/thumbsUp.png" }
];


export default function BlogPostContent() {
    return(
        <section className="BlogPostContent">
            <BlogHeader />
            <BlogContent />
            <CommentForm />
            <CommentsList />
        </section>
    )
};

function BlogHeader () {
    return (
        <div className="BlogHeader">
            <div className="Header">
                <h3>02</h3>
                <p>10 nepříjemných věcí, které Vám váš bankéř určitě zatajil</p>
            </div>
            <div className="Details">
                {data.map((detail, i) => {
                    const { time, data, src, alt} = detail

                    return (
                        <div className="Details__item" key={i}>
                            <h3>
                                {time || data}
                            </h3>
                            <Image src={src} alt={alt} width={50} height={50}/>
                        </div>
                    )
                })}
            </div>
            <div className="settings">
                <SVGButton src='/thumbsUp.svg'/>
                <SVGButton src='/thumbsUp.svg'/>
            </div>
            <div className="devider"/>
        </div>
    )
}


const splitContent = (content) => {
    return content.split('<br /><br />').map(paragraph => 
        paragraph.split('<br />').map(line => line.trim())
    );
};
  
const renderContent = (content) => {
  return splitContent(content).map((paragraph, pIndex) => {
    const hasListItems = paragraph.some(line => line.startsWith('<dot/>') || line.startsWith('<sub/>'));
    
    if (hasListItems) {
      return (
        <ul key={pIndex} className="styled-list">
          {paragraph.map((line, lIndex) => {
            if (line.startsWith('<dot/>')) {
              return <li key={lIndex} className="main-list-item">{line.slice(6)}</li>;
            } else if (line.startsWith('<sub/>')) {
              return <li key={lIndex} className="sub-list-item">{line.slice(6)}</li>;
            } else {
              return <li key={lIndex} className="text-item">{line}</li>;
            }
          })}
        </ul>
      );
    } else {
      return (
        <p key={pIndex}>
          {paragraph.map((line, lIndex) => (
            <Fragment key={lIndex}>
              {line}
              {lIndex < paragraph.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      );
    }
  });
};
  

const renderIntroContent = (content) => {
    return splitContent(content).map((paragraph, pIndex) => (
      <p key={pIndex}>
        {paragraph.map((line, lIndex) => (
          <Fragment key={lIndex}>
            {line}
            {lIndex < paragraph.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    ));
};

function ContentMap({ handleCircleClick }) {
    return (
      <div className="ContentMap">
        <h3>Table of Contents:</h3>
        <ul>
          {BlogPostData.map((post, index) => (
            <li key={post.number}>
              <button onClick={() => handleCircleClick(index)}>
                {post.number}. {post.header}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
}

function BlogContent () {
  const sectionRef = useRef(null);
  const contentWrapperRefs = useRef([]);
  const [ isHovered, setIsHovered ] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  const points = 8;

  // Calculate peak points with useMemo
  const peakPoints = useMemo(() => (
      Array.from({ length: points }, (_, i) => i / points)
  ), [points]);

  const handleCircleClick = (index) => {
    const targetElement = contentWrapperRefs.current[index];
    if (targetElement) {
      if (window.lenis) {
        // If using Lenis smooth scroll
        window.lenis.scrollTo(targetElement, {
          offset: 0,
          immediate: false,
          duration: 1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        // Fallback to native smooth scroll
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const tablecontnent = useTransform(
    scrollYProgress,
    [ 0, 0.05, 0.9, 0.95, 1 ],
    [ 0, 1, 1, 0, 0]
  )

  const tableContentVariants = {
    hidden: { x: "-25vw" },
    visible: { x: "-5vw" }
  };


  //Circle anims
  const circleProgress0 = useTransform(scrollYProgress, [0, peakPoints[0]], [1, 1], { clamp: true });
  const circleProgress1 = useTransform(scrollYProgress, [peakPoints[1] - 0.05, peakPoints[1]], [0, 1], { clamp: true });
  const circleProgress2 = useTransform(scrollYProgress, [peakPoints[2] - 0.05, peakPoints[2]], [0, 1], { clamp: true });
  const circleProgress3 = useTransform(scrollYProgress, [peakPoints[3] - 0.05, peakPoints[3]], [0, 1], { clamp: true });
  const circleProgress4 = useTransform(scrollYProgress, [peakPoints[4] - 0.05, peakPoints[4]], [0, 1], { clamp: true });
  const circleProgress5 = useTransform(scrollYProgress, [peakPoints[5] - 0.05, peakPoints[5]], [0, 1], { clamp: true });
  const circleProgress6 = useTransform(scrollYProgress, [peakPoints[6] - 0.05, peakPoints[6]], [0, 1], { clamp: true });
  const circleProgress7 = useTransform(scrollYProgress, [peakPoints[7] - 0.05, peakPoints[7]], [0, 1], { clamp: true });

  
  //Segents anims
  const segmentProgress0 = useTransform(scrollYProgress, [peakPoints[0], peakPoints[1]], ['100%', '0%'], { clamp: true });
  const segmentProgress1 = useTransform(scrollYProgress, [peakPoints[1], peakPoints[2]], ['100%', '0%'], { clamp: true });
  const segmentProgress2 = useTransform(scrollYProgress, [peakPoints[2], peakPoints[3]], ['100%', '0%'], { clamp: true });
  const segmentProgress3 = useTransform(scrollYProgress, [peakPoints[3], peakPoints[4]], ['100%', '0%'], { clamp: true });
  const segmentProgress4 = useTransform(scrollYProgress, [peakPoints[4], peakPoints[5]], ['100%', '0%'], { clamp: true });
  const segmentProgress5 = useTransform(scrollYProgress, [peakPoints[5], peakPoints[6]], ['100%', '0%'], { clamp: true });
  const segmentProgress6 = useTransform(scrollYProgress, [peakPoints[6], peakPoints[7]], ['100%', '0%'], { clamp: true });
  const segmentProgress7 = useTransform(scrollYProgress, [peakPoints[7], 1], ['100%', '0%'], { clamp: true });

  const BlogPostData = [
    {
      header: 'Understanding Financial Planning',
      number: '01',
      content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />
  
          <dot/>Key Components of Financial Planning<br />
          <sub/>Budgeting: Track income and expenses<br />
          <sub/>Saving: Build emergency funds and long-term wealth<br />
          <sub/>Investing: Grow your money over time<br />
          <sub/>Risk Management: Protect your assets with insurance<br />
          <sub/>Tax Planning: Optimize your tax situation<br />
          <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
          
          A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
          
          <dot/>Steps to Create a Financial Plan<br />
          <sub/>1. Set clear, measurable financial goals<br />
          <sub/>2. Assess your current financial situation<br />
          <sub/>3. Create a realistic budget<br />
          <sub/>4. Develop a debt repayment strategy<br />
          <sub/>5. Build an emergency fund<br />
          <sub/>6. Invest for the future<br />
          <sub/>7. Review and adjust your plan regularly<br /><br />
          
          Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
      alt: '',
      src: '',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress0,
      segmentAnim: segmentProgress0
  },
    {
      header: 'The Importance of Emergency Funds',
      number: '02',
      content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />
  
          <dot/>What is an Emergency Fund?<br />
          An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
          
          <dot/>Why is an Emergency Fund Important?<br />
          <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
          <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
          <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
          <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
          
          <dot/>How Much Should You Save?<br />
          Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
          <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
          <sub/>Family Size: Larger families might require more substantial savings<br />
          <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
          
          <dot/>Building Your Emergency Fund<br />
          <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
          <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
          <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
          <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
          <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
          
          Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
      alt: 'image_1',
      src: '/assets/reviewsBackground.png',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress1,
      segmentAnim: segmentProgress1
    },
    {
      header: 'Understanding Financial Planning',
      number: '03',
      content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />
      
      <dot/>Key Components of Financial Planning<br />
      <sub/>Budgeting: Track income and expenses<br />
      <sub/>Saving: Build emergency funds and long-term wealth<br />
      <sub/>Investing: Grow your money over time<br />
      <sub/>Risk Management: Protect your assets with insurance<br />
      <sub/>Tax Planning: Optimize your tax situation<br />
      <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
      
      A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
      
      <dot/>Steps to Create a Financial Plan<br />
      <sub/>1. Set clear, measurable financial goals<br />
      <sub/>2. Assess your current financial situation<br />
      <sub/>3. Create a realistic budget<br />
      <sub/>4. Develop a debt repayment strategy<br />
      <sub/>5. Build an emergency fund<br />
      <sub/>6. Invest for the future<br />
      <sub/>7. Review and adjust your plan regularly<br /><br />
      
      Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
      alt: 'Comprehensive financial planning illustration',
      src: '',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress2,
      segmentAnim: segmentProgress2
    },
    {
      header: 'The Importance of Emergency Funds',
      number: '04',
      content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />
  
      <dot/>What is an Emergency Fund?<br />
      An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
      
      <dot/>Why is an Emergency Fund Important?<br />
      <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
      <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
      <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
      <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
      
      <dot/>How Much Should You Save?<br />
      Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
      <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
      <sub/>Family Size: Larger families might require more substantial savings<br />
      <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
      
      <dot/>Building Your Emergency Fund<br />
      <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
      <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
      <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
      <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
      <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
      
      Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
      alt: 'Emergency fund savings concept',
      src: '',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress3,
      segmentAnim: segmentProgress3
    },
    {
      header: 'Understanding Financial Planning',
      number: '05',
      content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />
  
      <dot/>Key Components of Financial Planning<br />
      <sub/>Budgeting: Track income and expenses<br />
      <sub/>Saving: Build emergency funds and long-term wealth<br />
      <sub/>Investing: Grow your money over time<br />
      <sub/>Risk Management: Protect your assets with insurance<br />
      <sub/>Tax Planning: Optimize your tax situation<br />
      <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
      
      A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
      
      <dot/>Steps to Create a Financial Plan<br />
      <sub/>1. Set clear, measurable financial goals<br />
      <sub/>2. Assess your current financial situation<br />
      <sub/>3. Create a realistic budget<br />
      <sub/>4. Develop a debt repayment strategy<br />
      <sub/>5. Build an emergency fund<br />
      <sub/>6. Invest for the future<br />
      <sub/>7. Review and adjust your plan regularly<br /><br />
      
      Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
      alt: 'Comprehensive financial planning illustration',
      src: '',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress4,
      segmentAnim: segmentProgress4
    },
    {
      header: 'The Importance of Emergency Funds',
      number: '06',
      content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />
  
      <dot/>What is an Emergency Fund?<br />
      An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
      
      <dot/>Why is an Emergency Fund Important?<br />
      <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
      <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
      <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
      <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
      
      <dot/>How Much Should You Save?<br />
      Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
      <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
      <sub/>Family Size: Larger families might require more substantial savings<br />
      <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
      
      <dot/>Building Your Emergency Fund<br />
      <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
      <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
      <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
      <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
      <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
      
      Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
      alt: 'Emergency fund savings concept',
      src: '',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress5,
      segmentAnim: segmentProgress5
    },
    {
      header: 'Understanding Financial Planning',
      number: '07',
      content: `Financial planning is the cornerstone of long-term financial stability and success. It involves carefully managing your money to achieve your life goals.<br /><br />
  
      <dot/>Key Components of Financial Planning<br />
      <sub/>Budgeting: Track income and expenses<br />
      <sub/>Saving: Build emergency funds and long-term wealth<br />
      <sub/>Investing: Grow your money over time<br />
      <sub/>Risk Management: Protect your assets with insurance<br />
      <sub/>Tax Planning: Optimize your tax situation<br />
      <sub/>Estate Planning: Prepare for wealth transfer<br /><br />
      
      A comprehensive financial plan should consider both your current financial situation and your future aspirations. It's a dynamic process that requires regular review and adjustment.<br /><br />
      
      <dot/>Steps to Create a Financial Plan<br />
      <sub/>1. Set clear, measurable financial goals<br />
      <sub/>2. Assess your current financial situation<br />
      <sub/>3. Create a realistic budget<br />
      <sub/>4. Develop a debt repayment strategy<br />
      <sub/>5. Build an emergency fund<br />
      <sub/>6. Invest for the future<br />
      <sub/>7. Review and adjust your plan regularly<br /><br />
      
      Remember, financial planning is not a one-time event. As your life changes, so should your financial plan. Regular reviews and adjustments are crucial to stay on track towards your financial goals.`,
      alt: 'Comprehensive financial planning illustration',
      src: '',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress6,
      segmentAnim: segmentProgress6
    },
    {
      header: 'The Importance of Emergency Funds',
      number: '08',
      content: `An emergency fund is a crucial component of financial stability, acting as a financial safety net during unexpected situations.<br /><br />
  
      <dot/>What is an Emergency Fund?<br />
      An emergency fund is a dedicated savings account to cover unexpected expenses or financial emergencies. It provides a buffer against life's uncertainties without relying on high-interest credit cards or loans.<br /><br />
      
      <dot/>Why is an Emergency Fund Important?<br />
      <sub/>Financial Security: Protects against unexpected job loss or income reduction<br />
      <sub/>Stress Reduction: Provides peace of mind during challenging times<br />
      <sub/>Avoiding Debt: Prevents reliance on high-interest loans or credit cards<br />
      <sub/>Financial Flexibility: Allows you to take advantage of opportunities<br /><br />
      
      <dot/>How Much Should You Save?<br />
      Financial experts generally recommend saving 3-6 months of living expenses. However, the ideal amount can vary based on individual circumstances:<br />
      <sub/>Job Stability: Those with less stable income may need larger emergency funds<br />
      <sub/>Family Size: Larger families might require more substantial savings<br />
      <sub/>Health Considerations: Individuals with chronic health issues may need extra funds<br /><br />
      
      <dot/>Building Your Emergency Fund<br />
      <sub/>Start Small: Begin with a goal of $1,000 and build from there<br />
      <sub/>Automate Savings: Set up automatic transfers to your emergency fund<br />
      <sub/>Use Windfalls: Allocate tax refunds or bonuses to your emergency savings<br />
      <sub/>Cut Unnecessary Expenses: Redirect savings to your emergency fund<br />
      <sub/>Increase Income: Consider part-time work or freelancing to boost savings<br /><br />
      
      Remember, building an emergency fund takes time. Start small and be consistent in your savings efforts to achieve long-term financial security.`,
      alt: 'Emergency fund savings concept',
      src: '',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress7,
      segmentAnim: segmentProgress7
    }
  ]

  return (
      <div className="BlogContent" ref={sectionRef}>
          <div className="Header">
              <ContentMap handleCircleClick={handleCircleClick} />
              <div className="Intro__Container">
                  <h3>Úvod</h3>
                  {renderIntroContent(blogIntro.content)}
              </div>
              <div className="devider"/>
          </div>
          <div className="Content__container">
              <motion.div
                  className="tableContant"
                  initial="hidden"
                  animate={isHovered ? "visible" : "hidden"}
                  variants={tableContentVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ 
                      opacity: tablecontnent
                  }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
              >
                  <motion.div 
                      className="tableContent__hover"
                  >
                      <p>Content</p>
                  </motion.div>
                  <ContentMap handleCircleClick={handleCircleClick} />
              </motion.div>

              <motion.div className="Button__CTA"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ 
                      opacity: tablecontnent
                  }}
              >
                  <RoundButton href='/' text='Book a Call'/>
              </motion.div>
              <motion.div 
                  className="ProgressBar__container__wrapper"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ 
                      opacity: tablecontnent
                  }}
              >
                  <div 
                      className='ProgressBar__container'>
                      <div className="Blog__MainPage__progressBar">
                          <div className="Blog__MainPage__progressBar_div">
                            {BlogPostData.map((post, index) => {
                                const isLastItem = index === BlogPostData.length - 1;
                                return (
                                    <div className="Blog__MainPage__progressBar__Container" key={index}>
                                        <div className="circle" onClick={() => handleCircleClick(index)}>
                                            <motion.div 
                                                className="circle__inner" 
                                                style={{ scale: post.circleAnim }}
                                            ></motion.div>
                                        </div>
                                        {!isLastItem && (
                                            <div className="segment">
                                                <motion.div 
                                                    className="segment__inner" 
                                                    style={{ y: post.segmentAnim }}
                                                ></motion.div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                          </div>
                      </div>
                  </div>
              </motion.div>
              
              {BlogPostData.map((paragraph, i) => {
                  const { header, number, content, src, alt, styles} = paragraph
                  return (
                      <div className="Content__wrapper" key={number}  ref={el => contentWrapperRefs.current[i] = el}>
                          <div className="paragraph">
                              <div className="paragraph__header">
                                  <h2>{header}</h2>
                                  <h3>{number}</h3>
                                  <div className="devider"/>
                              </div>
                              
                              <div className="styled-content">
                                  {renderContent(content)}
                              </div>
                          </div>
                          <div className="image__wrapper" style={styles}>
                              {src && <CustomImage src={src} altText={alt}/>}
                          </div>
                      </div>
                  ) 
              })}
          </div>
      </div>
  )
}

function CommentForm () {
    return (
        <div className="CommentForm">
            <div className="CommentForm__devider"/>
            <div className="CommentForm__header">
                <div className="header">
                    <div className="text">
                        <h3>η</h3>
                        <p>Líbí se Vám co čtete?
                        dejte tomuto příspěvku Like</p>
                    </div>
                    <div className="butttons">
                        <div className="buttton">
                            <SVGButton src="/thumbsUp.png" altText="thumbsUp_icon"/>
                        </div>
                        <div className="buttton">
                            <SVGButton src="/thumbsUp.png" altText={icons.name}/>
                        </div>
                    </div>
                </div>  
                <div className="header__devider"/>
                <div className="reference">
                    <div className="header">
                        <h3>?</h3>
                        <p>Znáte někoho kdo tento dataset nemá v paměti? 
                        Sdílejte jim to! Ať o tohle nepřijdou!</p>
                    </div>
                    <div className="icons">
                        {icons.map((icon, i) => (
                            <Image src={icon.src} alt={icon.name} key={i} width={50} height={50}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className="CommentForm__form">
                <div className="Form__container">
                    <div className="Form__header">
                        <div className="Form__header__text">
                            <p>
                                NEBO NÁM MŮŽETE DÁT ODEZVU SKRZE VÁŠ KOMENTÁŘ. 
                            </p>
                        </div>
                    </div>
                    <div className="Form__form">
                        <div className="devider"/>
                        <div className="button__container">
                            <RoundButton  href='/' text='Poslat'/>
                        </div>
                        <div className="button__devider"/>
                        <form>
                            <div className="Form__input__container">
                                <p>Δ</p>
                                <label htmlFor="name">Jméno:</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="Vaše jméno"
                                    required
                                />
                            </div>
                            <div className="devider2"/>
                            <div className="Form__input__container">
                                <p>Δ</p>
                                <label htmlFor="email">E-mail:</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Váš email"
                                    required
                                />
                            </div>
                            <div className="devider3"/>
                            <p className="gdpr">Klinutím na “chci se zapojit” souhlasíte se zpracováním vašich osobních údajů</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CommentsList() {
    const [visibleComments, setVisibleComments] = useState(4);
    const totalComments = comments.length;

    const viewMore = () => {
        setVisibleComments(prev => Math.min(prev + 4, totalComments));
    };

    const commentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };
    return (
        <div className="CommentsList">
            <div className="CommentsList__header">
                <div className="Header__title">
                    <h3>ψ</h3>
                    <p>Komentáře čtenářů:</p>
                </div>
                <div className="Header__stats">
                    {data.map(( info, i) => {
                        const { time, data, src, alt } = info
                        return (
                            <div className="stat" key={i}>
                                <p>{data}</p>
                                {data && <Image src={src} alt={alt} width={50} height={50}/>}
                            </div>
                        )
                    })}
                </div>
                <div className="devider"/>
            </div>

            <motion.div className="CommentsList__comments">
                <AnimatePresence>
                    {comments.slice(0, visibleComments).map((comment, i) => {
                        const { name, content, likes, number, hashtag } = comment
                        return (
                            <motion.div 
                                key={number}
                                className="comment__wrapper"
                                variants={commentVariants}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                                layout
                            >
                                <div  className="devider"/>
                                <div className="comment__header">
                                    <div className="comment__header__title">
                                        <h3>
                                            {number}
                                        </h3>
                                        <h3>
                                            #{hashtag}
                                        </h3>
                                    </div>
                                    

                                    <div className="comment__header__likes">
                                        <h3>{likes}</h3>
                                        <Image src='/thumbsUp.svg' alt="thumbsUp-icon" width={30} height={30}/>
                                        <SVGButton src='/thumbsUp.svg' altText='thumbsUp-icon'/>
                                    </div>
                                </div>
                                <div className="comment__content">
                                    <p>{content}</p>
                                    <h4>| {name}</h4>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>

            { visibleComments < totalComments &&( 
                <div className="button__viewMore" onClick={viewMore}>
                    <SmallButton text='View More' href='#'/>
                </div>
            )}
        </div>
    )
}

