import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Head>
        <title>School Home Page</title>
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <section className="my-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-lg">
              Our school is committed to providing quality education and
              fostering a positive learning environment.
            </p>
          </section>

          <section className="my-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <ul className="list-disc list-inside text-left">
              <li>Science Fair - June 30, 2024</li>
              <li>Parent-Teacher Conference - July 15, 2024</li>
              <li>Summer Camp - August 1-10, 2024</li>
            </ul>
          </section>

          <section className="my-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg">Email: info@ourschool.edu</p>
            <p className="text-lg">Phone: (123) 456-7890</p>
          </section>
        </main>

        <footer className="w-full h-24 flex items-center justify-center border-t">
          <p className="text-center">
            &copy; 2024 Our School. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
