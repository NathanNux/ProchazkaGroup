import Image from "next/image"
import { Fragment, useMemo, useRef, useState } from "react"
import { useScroll, motion, useTransform, AnimatePresence } from "framer-motion";
import { BlogData, blogIntro, BlogPostData, comments, icons } from "@/constants/pages/blog";
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import CustomImage from "@/components/ui/stickyImage";
import SmallButton from "@/components/ui/stickyButtons/buttons/SmallButton";



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
                {BlogData.map((detail, i) => {
                    const { time, data, src, alt} = detail

                    return (
                        <div className="Details__item" key={`itemsDet${i}`}>
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
        <ul key={`contsr${pIndex}`} className="styled-list">
          {paragraph.map((line, lIndex) => {
            if (line.startsWith('<dot/>')) {
              return <li key={`li${lIndex}`} className="main-list-item">{line.slice(6)}</li>;
            } else if (line.startsWith('<sub/>')) {
              return <li key={`li${lIndex}`} className="sub-list-item">{line.slice(6)}</li>;
            } else {
              return <li key={`li${lIndex}`} className="text-item">{line}</li>;
            }
          })}
        </ul>
      );
    } else {
      return (
        <p key={pIndex}>
          {paragraph.map((line, lIndex) => (
            <Fragment key={`parag${lIndex}`}>
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
      <p key={`lipar${pIndex}`}>
        {paragraph.map((line, lIndex) => (
          <Fragment key={`fra${lIndex}`}>
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
            <li key={`blogD${post.number}`}>
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

  const BlogPostBar = [
    {
      number: '01',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress0,
      segmentAnim: segmentProgress0
  },
    {
      number: '02',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress1,
      segmentAnim: segmentProgress1
    },
    {
      number: '03',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress2,
      segmentAnim: segmentProgress2
    },
    {
      number: '04',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress3,
      segmentAnim: segmentProgress3
    },
    {
      number: '05',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress4,
      segmentAnim: segmentProgress4
    },
    {
      number: '06',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress5,
      segmentAnim: segmentProgress5
    },
    {
      number: '07',
      styles: {
        // Add any custom styles here
      },
      circleAnim: circleProgress6,
      segmentAnim: segmentProgress6
    },
    {
      number: '08',
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
                            {BlogPostBar.map((post, index) => {
                                const isLastItem = index === BlogPostData.length - 1;
                                return (
                                    <div className="Blog__MainPage__progressBar__Container" key={`progressbar${index}`}>
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
                      <div className="Content__wrapper" key={`wrp${number}`}  ref={el => contentWrapperRefs.current[i] = el}>
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
                            <Image src={icon.src} alt={icon.name} key={`icons${i}`} width={50} height={50}/>
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
                    {BlogData.map(( info, i) => {
                        const { time, data, src, alt } = info
                        return (
                            <div className="stat" key={`stat${i}`}>
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
                                key={`comment${number}`}
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

