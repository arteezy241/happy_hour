import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Cover() {
  // REPLACE THESE WITH YOUR REAL NAMES
  const teamMembers = [
    "Sarria Mhico - Lead Developer,UI/UX Designer,database designer,hosting manager",
    "Mabingnay John Kyle - UI/UX Designer,data engineer",
    "Amora John Stanford - Video Editor,script writer",
    "Navarro Sean Andrei - Shop owner"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-6 text-white">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20 text-center shadow-2xl">
        <CardContent className="py-12 px-8">
          {/* Project Title */}
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-4 text-white">
            Happy Hour Liquors
          </h1>
          
          <p className="text-gray-300 text-xl mb-12 font-['Poppins']">
            Human Computer Interaction - Final Project
          </p>

          {/* Team Members List */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-b border-gray-600 pb-2 inline-block">
              Developed By
            </h2>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <p key={index} className="text-lg text-gray-200 font-['Poppins']">
                  {member}
                </p>
              ))}
            </div>
          </div>

          {/* Enter Button */}
          <Link href="/">
            <Button className="bg-white text-black hover:bg-gray-200 text-lg px-10 py-6 rounded-full font-bold transition-transform hover:scale-105">
              ENTER SITE
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}