import React from 'react';

const Messaging = () => {
     return (
          <div className='w-full lg:w-1/4 bg-gray-50'>
               <div className="text-sm font-medium space-y-6 h-[calc(100vh-160px)] overflow-y-scroll pr-4 pl-2 py-2 relative">
                    <div className="px-4 py-2 w-full pt-4 text-3xl font-bold fixed top-0 bg-white"> Message</div>
                    <div className="flex gap-3 pt-7">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gray-200"> Hi, I’m John </div>
                    </div>

                    <div className="flex gap-2 flex-row-reverse items-end">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">  I’m Lisa. welcome John</div>
                    </div>

                    <div className="flex gap-3">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gray-200">  I’m selling a photo of a sunset. It’s a print on canvas, signed by the photographer. Do you like it? 😊 </div>
                    </div>

                    <div className="flex gap-2 flex-row-reverse items-end">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">  Wow, it’s beautiful. How much ? 😍 </div>
                    </div>

                    <div className="flex gap-3">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gray-200"> I’m glad you like it. I’m asking for $200 🤑</div>
                    </div>

                    <div className="flex gap-2 flex-row-reverse items-end">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow"> $200? Too steep. Can you lower the price a bit? 😕</div>
                    </div>

                    <div className="flex gap-3">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gray-200"> Well, I can’t go too low because I paid a lot. But I’m willing to negotiate. What’s your offer? 🤔 </div>

                    </div>

                    <div className="flex gap-2 flex-row-reverse items-end">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow"> Sorry, can’t pay more than $150. 😅</div>
                    </div>

                    <div className="flex gap-3">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gray-200"> $150? Too low. Photo worth more.  😬</div>
                    </div>

                    <div className="flex gap-2 flex-row-reverse items-end">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow"> Too high. I Can’t . How about $160? Final offer. 😬 </div>
                    </div>

                    <div className="flex gap-3">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gray-200"> Fine, fine. You’re hard to please. I’ll take $160, but only because I like you. 😍</div>
                    </div>

                    <div className="flex gap-2 flex-row-reverse items-end">
                         <div className='w-10 h-10 rounded-full bg-gray-300 text-gray-800 text-center flex place-content-center items-center font-semibold lg:text-lg'>NA</div>
                         <div className="px-4 py-2 rounded-[20px] max-w-44 lg:max-w-56 bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow"> Great, thank you. I appreciate it. I love this photo and can’t wait to hang it. 😩 </div>
                    </div>
               </div>

               <div className="relative flex h-fit py-2 place-content-center items-center space-x-5 px-5 bg-gray-200 rounded-lg">
                    <textarea placeholder="Write your message" rows="1" className="w-full shadow-inner resize-none bg-secondery rounded-full p-2 border-2"></textarea>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                         <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>

               </div>
          </div>
     )
}

export default Messaging