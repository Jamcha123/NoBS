import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import './App.css'
import * as THREE from 'three'
import {motion} from 'framer-motion'
import axios from 'axios'
import profile from './assets/daliy.png';

function AddNavbar(){
  return(
    <nav className="fixed w-[100%] h-[4em] top-0 m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center z-[99] ">
      <ul className="relative w-[75%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
        <div className="relative w-[fit-content] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <motion.li initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='text-violet-200 underline underline-offset-4 text-xl '><a href="#about">About NoBS</a></motion.li>
        </div>
        <div className="relative w-[fit-content] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <motion.li initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='text-violet-200 underline underline-offset-4 text-xl '><a href="#products">Products</a></motion.li>
        </div>
        <div className="relative w-[fit-content] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <motion.li initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='text-violet-200 underline underline-offset-4 text-xl '><a href="#pricing">Pricing</a></motion.li>
        </div>
        <div className="relative w-[fit-content] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <motion.li initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='text-violet-200 underline underline-offset-4 text-xl '><a href="#contact">Contact Info</a></motion.li>
        </div>
      </ul>
      <ul className="relative w-[25%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
        <div className="relative w-[fit-content] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center">
          <motion.iframe initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="relative w-[114px] h-[32px] m-auto p-[0] bg-transparent " src="https://github.com/sponsors/Jamcha123/button" title="Sponsor Jamcha123" height="32" width="114"></motion.iframe>
        </div>
        <div className="relative w-[fit-content] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <motion.button onClick={() => window.location.href = "/login.html"} initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="relative w-[10em] h-[75%] cursor-pointer m-auto p-[0] bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-600 flex flex-col align-middle justify-center text-center rounded-md border-transparent text-white text-xl border-[4px] underline underline-offset-2 " >
            Login Now
          </motion.button>
        </div>
      </ul>
    </nav>
  )
}
export default function App(){
  useEffect(() => {
    const arr = ['https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg', 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg', 'https://images.pexels.com/photos/2877338/pexels-photo-2877338.jpeg', 'https://images.pexels.com/photos/1764956/pexels-photo-1764956.jpeg', 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg', 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg', 'https://images.pexels.com/photos/211151/pexels-photo-211151.jpeg', 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg', 'https://images.pexels.com/photos/874242/pexels-photo-874242.jpeg', 'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg', 'https://images.pexels.com/photos/8369521/pexels-photo-8369521.jpeg', 'https://images.pexels.com/photos/6230962/pexels-photo-6230962.jpeg', 'https://images.pexels.com/photos/8382045/pexels-photo-8382045.jpeg', 'https://cdn.pixabay.com/photo/2016/06/27/22/14/man-1483480_640.jpg', 'https://cdn.pixabay.com/photo/2017/04/23/09/30/newspaper-2253408_640.jpg', 'https://cdn.pixabay.com/photo/2015/03/07/18/47/road-sign-663368_1280.jpg', 'https://cdn.pixabay.com/photo/2014/08/07/21/13/newspaper-412811_640.jpg', 'https://cdn.pixabay.com/photo/2015/12/03/10/13/news-1074610_640.jpg', 'https://cdn.pixabay.com/photo/2020/03/22/17/47/scrabble-4957948_640.jpg', 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg']
    const image_container = document.getElementById("image-container")

    setInterval(() => {
      image_container.removeChild(image_container.children[0])
      let x = document.createElement("div")
      x.classList.add("items")

      let image = document.createElement("img")
      image.width = 100 + "%"
      image.height = 100 + "%"
      image.src = arr[Math.floor(Math.random() * arr.length + 0)]
      x.appendChild(image)

      image_container.appendChild(x)
    }, 5000)

    document.body.addEventListener("pointermove", (e) => {
      e.preventDefault()
      if((e.clientX / 10) <= 30){
        document.getElementById("slider").style.display = "none"
      }
      if((e.clientX / 10) >= 30){
        document.getElementById("slider").style.display = "flex"
      }
      document.getElementById("slider").style.width = (e.clientX / 10) + "%"
    })

  })
  return(
    <div className="relative w-[100%] h-[fit-content] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
      <AddNavbar></AddNavbar>
      <div className="fixed top-0 left-0 rotate-z-[0deg] w-[100%] h-[100%] m-auto p-[0] opacity-[0.5] bg-black flex flex-row align-middle justify-center text-center z-[3] "></div>
      <div className="fixed top-0 left-0 rotate-z-[0deg] w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center z-[2] ">
        <div id='slider' className="relative w-[75%] h-[200%] m-auto p-[0] bg-gradient-to-tr from-violet-950 via-purple-950 to-pink-950 rotate-z-[-30deg] translate-y-[-20%] translate-x-[-100%] lg:translate-x-[-20%] flex flex-col align-middle justify-center text-center ">

        </div>
        <div className="relative w-[60%] h-[100%] m-auto p-[0] bg-transparent' "></div>
      </div>
      <div id='image-container' className="fixed top-0 left-0 rotate-z-[0deg] w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center z-[1] ">
        <img src="https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg" width={100 + "%"} height={100 + "%"} alt="" />
      </div>
      <section className='relative translate-y-[0%] z-[3] w-[100%] h-[95vh] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center overflow-hidden '> 
        <div className="relative w-[100%] h-[50vh] z-[4] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <div className="relative w-[100%] h-[75%] m-auto p-[0] bg-transparent z-[99] flex flex-col align-middle justify-center text-center ">
            <h1 className='flex flex-col align-middle justify-center bg-transparent text-center text-4xl z-[99] mt-[10%] text-white'>NoBS - No More Bulls**t</h1>
            <h1 className='flex flex-col align-middle justify-center bg-transparent text-center text-3xl z-[99] mt-[2%] text-white'>Cut though all the Bulls**t on Youtube</h1>
          </div>
          <div className="relative w-[100%] h-[25%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
            <motion.button onClick={() => window.location.href = "/login.html"} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="relative w-[10em] h-[3em] cursor-pointer m-auto ml-0 mr-0 p-[0] bg-slate-700 underline underline-offset-4 flex flex-col align-middle justify-center text-center text-xl text-white ">
              Get Started
            </motion.button>
            <motion.button onClick={() => window.location.href = "/login.html"} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className="relative w-[10em] h-[3em] cursor-pointer m-auto ml-[2%] mr-0 p-[0] bg-slate-700 underline underline-offset-4 flex flex-col align-middle justify-center text-center text-xl text-white ">
              Login Now
            </motion.button>
          </div>
        </div>
      </section>
      <section id='about' className='relative translate-y-[0%] z-[5] w-[100%] h-[50vh] m-auto p-[0] bg-black flex flex-row align-middle justify-center text-center '>
        <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle ">
          <div className="relative w-[75%] h-[fit-content] m-auto mt-[5%] mb-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
            <h1 className='text-4xl text-white'>About NoBS</h1>
            <h1 className='text-2xl text-white'>Be Patient - NoBS's AI can take a while</h1>
          </div>
          <div className="relative w-[75%] h-[fit-content] m-auto mt-[2%] mb-0 p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
            <div className="relative w-[100%] lg:w-[75%] h-[20em] lg:h-[12em] m-auto ml-0 mr-0 mb-0 p-[0] bg-slate-900 rounded-2xl flex flex-col align-middle ">
              <div className="relative w-[90%] h-[fit-content] mb-0 mt-[3%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
                <p className='text-2xl text-white flex flex-col align-middle justify-center text-center w-[100%] h-[fit-content] m-auto lg:mt-[0%] mt-[5%] p-[0] '>
                  "NoBS - Youtube logic fallacy and fact checker.<br />
                  NoBS - a great use for AI and google search api<br />
                  NoBS fact checks and finds fallacies in youtube transcript.<br />
                  Don't be fooled by youtube bulls**t."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='products' className='relative translate-y-[0%] z-[5] w-[100%] h-[fit-content] m-auto p-[0] bg-black flex flex-col align-middle '>
        <div className="relative w-[75%] h-[15vh] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
          <h1 className='text-2xl text-white'>NoBS Product lists</h1>
        </div>
        <div className="relative w-[75%] xl:w-[90%] h-[fit-content] lg:h-[55vh] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center xl:grid xl:grid-cols-4 xl:grid-rows-2 gap-[20px] ">
          <div className="relative w-[100%] h-[25vh] xl:h-[100%] m-auto p-[0] bg-slate-900 rounded-md flex flex-col align-middle ">
            <h1 className='text-2xl text-white mt-[5%] '>NoBS NPM Package</h1>
            <div className="relative w-[100%] h-[90%] m-auto mt-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
              <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">

              </div>
              <div className="relative w-[50%] md:w-[75%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
                <motion.button onClick={() => window.location.href = "https://www.npmjs.com/package/nobias"} initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[100%] h-[3em] m-auto p-[0] bg-slate-950 cursor-pointer text-center text-white text-xl underline underline-offset-2 ' >
                  NoBS NPM <a href="https://www.npmjs.com/package/nobias" className='text-violet-600' >Package</a>
                </motion.button>
              </div>
            </div>
          </div>
          <div className="relative w-[100%] h-[25vh] xl:h-[100%] m-auto p-[0] bg-slate-900 rounded-md flex flex-col align-middle ">
            <h1 className='text-2xl text-white mt-[5%] '>NoBS Python Package</h1>
            <div className="relative w-[100%] h-[90%] m-auto mt-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
              <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">

              </div>
              <div className="relative w-[75%] md:w-[90%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
                <motion.button onClick={() => window.location.href = "https://pypi.org/project/nobiaspy"} initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[100%] h-[3em] m-auto p-[0] bg-slate-950 cursor-pointer text-center text-white text-xl underline underline-offset-2 ' >
                  NoBS Python CLI <a href="https://pypi.org/project/nobiaspy" className='text-violet-600' >Package</a>
                </motion.button>
              </div>
            </div>
          </div>
          <div className="relative w-[100%] h-[25vh] xl:h-[100%] m-auto p-[0] bg-slate-900 rounded-md flex flex-col align-middle ">
            <h1 className='text-2xl text-white mt-[5%] '>NoBS Github Repo</h1>
            <div className="relative w-[100%] h-[90%] m-auto mt-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
              <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">

              </div>
              <div className="relative w-[75%] md:w-[90%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
                <motion.button onClick={() => window.location.href = "https://github.com/Jamcha123/NoBS"} initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[100%] h-[3em] m-auto p-[0] bg-slate-950 cursor-pointer text-center text-white text-xl underline underline-offset-2 ' >
                  NoBS Github <a href="https://github.com/Jamcha123/NoBS" className='text-violet-600' >Repo</a>
                </motion.button>
              </div>
            </div>
          </div>
          <div className="relative w-[100%] h-[25vh] xl:h-[100%] m-auto p-[0] bg-slate-900 rounded-md flex flex-col align-middle ">
            <h1 className='text-2xl text-white mt-[5%] '>NoBS Web App</h1>
            <div className="relative w-[100%] h-[90%] m-auto mt-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
              <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">

              </div>
              <div className="relative w-[75%] md:w-[90%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
                <motion.button onClick={() => window.location.href = "/login.html"} initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[100%] h-[3em] m-auto p-[0] bg-slate-950 cursor-pointer text-center text-white text-xl underline underline-offset-2 ' >
                  NoBS <a href="/login.html" className='text-violet-600' >Web App</a>
                </motion.button>
              </div>
            </div>
          </div>
          <div className="relative w-[100%] h-[25vh] xl:h-[100%] m-auto p-[0] bg-slate-900 rounded-md flex flex-col align-middle ">
            <h1 className="text-2xl text-white mt-[5%]">Github Sponsor</h1>
            <div className="relative w-[100%] h-[90%] m-auto mt-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
              <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">

              </div>
              <div className="relative w-[100%] md:w-[90%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
                <motion.button onClick={() => window.location.href = "https://github.com/sponsors/Jamcha123?preview=true"} initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[100%] h-[3em] m-auto p-[0] bg-slate-950 cursor-pointer text-center text-white text-xl underline underline-offset-2 ' >
                  Github... <a href="https://github.com/sponsors/Jamcha123?preview=true" className='text-violet-600' >Sponsor Me </a>
                </motion.button>
              </div>
            </div>
          </div>
          <div className="relative w-[100%] h-[25vh] xl:h-[100%] m-auto p-[0] bg-slate-900 rounded-md flex flex-col align-middle ">
            <h1 className='text-2xl text-white mt-[5%] '>Wikipedia BS Checker</h1>
            <div className="relative w-[100%] h-[90%] m-auto mt-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
              <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">

              </div>
              <div className="relative w-[100%] md:w-[90%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
                <motion.button onClick={() => window.location.href = "/login.html"} initial={{scale: 1}} whileTap={{scale: 1.1}} whileHover={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[100%] h-[3em] m-auto p-[0] bg-slate-950 cursor-pointer text-center text-white text-xl underline underline-offset-2 ' >
                  NoBS <a href="/login.html" className='text-violet-600' >Wikipedia BS Checker </a>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='pricing' className='relative translate-y-[0%] z-[5] w-[100%] h-[75vh] m-auto p-[0] bg-black flex flex-col align-middle '>
        <div className="relative w-[75%] h-[fit-content] m-auto mt-[10%] mb-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <h1 className="text-4xl text-white">
            Pricing For NoBS
          </h1>
        </div>
        <div className="relative w-[75%] h-[fit-content] m-auto mt-0 mb-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <div className=""></div>
          <p className='text-2xl text-white mt-[4%]'>
            -- NoBS Youtube Fact Checker = $0.10 per request 
          </p>
          <p className='text-2xl text-white mt-[4%] '>
            -- NoBS Youtube NPM package = You pay OpenAI via your API key
          </p>
        </div>
      </section>
      <section id='contact' className='relative translate-y-[0%] z-[5] w-[100%] h-[75vh] m-auto p-[0] bg-black flex flex-col align-middle '>
        <div className="relative w-[75%] h-[fit-content] m-auto mt-[5%] mb-0 p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <h1 className="text-4xl text-white">
            Contact Info
          </h1>
          <p className='text-2xl text-white'>
            If you find a Issue, contact me
          </p>
        </div>
        <div className="relative w-[100%] h-[fit-content] m-auto mt-[5%] mb-0 p-[0] bg-transparent flex flex-row align-middle justify-center text-center">
          <div className="relative w-[50%] h-[40vh] m-auto ml-0 mr-0 p-[0] bg-slate-800 flex flex-col align-middle justify-start text-start ">
            <p className='text-2xl text-white mt-[5%] ml-[3%] '>
              Github Issues: <a className='text-violet-600 underline underline-offset-2' href="https://github.com/Jamcha123/NoBias/issues">https://github.com/Jamcha123/NoBias/issues</a>
            </p>
            <p className='text-2xl text-white mt-[5%] ml-[3%] '>
              Email: <a className='text-violet-600 underline underline-offset-2' href="mailto:jameschambers732@gmail.com">jameschambers732@gmail.com</a>
            </p>
            <p className='text-2xl text-white mt-[5%] ml-[3%] '>
              Github Sponsor <a className='text-violet-600 underline underline-offset-4' href="https://github.com/sponsors/Jamcha123">Sponsor me (if you want)</a>
            </p>
            <p className='text-2xl text-white mt-[5%] ml-[3%] '>
              Daliy Dev Profile: <a className='text-violet-600' href="https://app.daily.dev/codewizard123">https://app.daily.dev/codewizard123</a>
            </p>
          </div>
        </div>

      </section>
    </div>
  )
}