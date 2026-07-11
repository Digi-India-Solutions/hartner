import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Haertner Immobilien",
  description: "Haertner Immobilien Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />

        <main className="grow">
          {children}
        </main> 
        <Footer />
      </body>
    </html>
  );
}


// import "./globals.css";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";

// export const metadata = {
//   title: "Haertner Immobilien",
//   description: "Haertner Immobilien Website",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="de" className="h-full antialiased">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100..900&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="min-h-full flex flex-col">
//         <Navbar />

//         <main className="grow">
//           {children}
//         </main> 
//         <Footer />
//       </body>
//     </html>
//   );
// }