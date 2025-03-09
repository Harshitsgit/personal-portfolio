// import Image from "next/image";
// export default function AboutUs() {
//   return (
//     <div className="min-h-screen bg-black text-white pt-20 px-10">
//       {/* Header */}
//       <header className="container mx-auto pt-8">
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
//           About Us
//         </h1>
//         <div className="h-1 w-20 bg-indigo-500 mt-4"></div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto pt-8 pb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-top pb-12">
//           {/* Image */}
//           <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
//             <Image
//               src="/about/1.heic?height=500&width=600"
//               alt="Album Designer"
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>

//           {/* About Text */}
//           <div className="space-y-6">
//             <h2 className="text-3xl font-bold text-indigo-400">
//               Let's Capture Your Story
//             </h2>
//             <p className="text-gray-300 text-lg">
//               Every moment is a memory waiting to be cherished. From the magic
//               of weddings and pre-wedding shoots to the joy of maternity
//               sessions and personal photoshoots, we're here to turn your special
//               occasions into beautiful works of art.
//             </p>
//             <p className="text-gray-300 text-lg">
//               Every photograph is a story waiting to be told. We believe that
//               your moments deserve more than just a snapshot—they deserve a
//               crafted masterpiece. By blending classic techniques with modern
//               innovation, we ensure that every smile, every tear, and every
//               glance is captured with creativity and authenticity
//             </p>
//             <div className="pt-4">
//               <h3 className="text-xl font-semibold text-indigo-400 mb-3">
//                 Our Promise to You
//               </h3>
//               <ul className="space-y-2 text-gray-300">
//                 <li className="flex items-start">
//                   <span className="text-indigo-500 mr-2">•</span>
//                   <span>
//                     Friendly Collaboration: We take the time to understand your
//                     vision and style, ensuring every shot reflects who you are.
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-indigo-500 mr-2">•</span>
//                   <span>
//                     Modern Meets Classic: With a blend of timeless techniques
//                     and modern creativity, we capture images that are both fresh
//                     and forever.
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-indigo-500 mr-2">•</span>
//                   <span>
//                     Consistent Quality: Whether it's a grand celebration or an
//                     intimate moment, our focus is on delivering a visual story
//                     that’s uniquely yours.
//                   </span>
//                 </li>
//                 {/* <li className="flex items-start">
//                   <span className="text-indigo-500 mr-2">•</span>
//                   <span>
//                     Attention to Every Detail: From the lighting to the tiniest
//                     smile, we make sure no precious moment is missed.
//                   </span>
//                 </li> */}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Team Section */}
//         {/* <section className="mt-24">
//           <h2 className="text-3xl font-bold mb-12 text-center">
//             Meet The Team
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((member) => (
//               <div
//                 key={member}
//                 className="bg-gray-900 rounded-lg overflow-hidden group hover:bg-gray-800 transition-colors"
//               >
//                 <div className="relative h-80 w-full">
//                   <Image
//                     src={`/placeholder.svg?height=320&width=300`}
//                     alt={`Team Member ${member}`}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-indigo-400">
//                     Creative Director
//                   </h3>
//                   <p className="text-gray-300 mt-2">
//                     Specializing in typography and visual storytelling with over
//                     8 years of experience in the industry.
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section> */}
//       </main>
//     </div>
//   );
// }

import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-10">
      {/* Header */}
      <header className="container max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          About Us
        </h1>
        <div className="h-1 w-20 bg-indigo-500 mt-1"></div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto pt-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-top pb-12">
          {/* Image */}
          <div className="relative h-[30rem] w-full rounded-lg overflow-hidden">
            <Image
              src="/about/1.heic?height=500&width=600"
              alt="Album Designer"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* About Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-indigo-400">
              Let's Capture Your Story
            </h2>
            <p className="text-gray-300 ">
              Every moment is a memory waiting to be cherished. From the magic
              of weddings and pre-wedding shoots to the joy of maternity
              sessions and personal photoshoots, we're here to turn your special
              occasions into beautiful works of art.
            </p>
            <p className="text-gray-300">
              Every photograph is a story waiting to be told. We believe that
              your moments deserve more than just a snapshot—they deserve a
              crafted masterpiece. By blending classic techniques with modern
              innovation, we ensure that every smile, every tear, and every
              glance is captured with creativity and authenticity.
            </p>
            <div className="pt-2">
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Our Promise to You
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>
                    Friendly Collaboration: We take the time to understand your
                    vision and style, ensuring every shot reflects who you are.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>
                    Modern Meets Classic: With a blend of timeless techniques
                    and modern creativity, we capture images that are both fresh
                    and forever.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>
                    Consistent Quality: Whether it's a grand celebration or an
                    intimate moment, our focus is on delivering a visual story
                    that’s uniquely yours.
                  </span>
                </li>
                {/* Additional list items can be uncommented as needed */}
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section (Commented Out) */}
        {/* <section className="mt-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Meet The Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div
                key={member}
                className="bg-gray-900 rounded-lg overflow-hidden group hover:bg-gray-800 transition-colors"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={`/placeholder.svg?height=320&width=300`}
                    alt={`Team Member ${member}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-400">
                    Creative Director
                  </h3>
                  <p className="text-gray-300 mt-2">
                    Specializing in typography and visual storytelling with over
                    8 years of experience in the industry.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
}
