"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGooglePlay, FaApple, FaGithub } from "react-icons/fa"; // Importing Icons

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        if (!id) return;

        async function fetchProject() {
            try {
                const res = await fetch(`/api/projects/${id}`);

                if (!res.ok) throw new Error("Project not found");

                const { success, data } = await res.json();

                if (success) {
                    setProject(data);
                } else {
                    throw new Error("Project not found");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProject();
    }, [id]);

    if (loading) return <div className="text-white text-center mt-10">⏳ Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">🚨 {error}</div>;
    if (!project) return <div className="text-white text-center mt-10">🚨 Project Not Found</div>;

    // Function to process text with new lines, bullet points, and bold formatting
    const processText = (text) => {
        return text.replace(/\\n/g, "\n").split("\n").map((line, index) => {
            if (line.startsWith("- ")) {
                return (
                    <div key={index} className="flex items-start gap-2 text-lg md:text-xl">
                        <span className="text-amber-500 font-bold">•</span>
                        <p dangerouslySetInnerHTML={{ __html: formatBoldText(line.substring(2)) }} />
                    </div>
                );
            }
            return <p key={index} className="mb-2 text-lg md:text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: formatBoldText(line) }} />;
        });
    };

    // Function to detect /*content*/ and make it bold
    const formatBoldText = (text) => {
        return text.replace(/\/\*(.*?)\*\//g, "<strong>$1</strong>");
    };

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white px-6 md:px-16 lg:px-32 py-12">
            <div className="container mx-auto flex flex-col lg:flex-row gap-16 items-start max-w-7xl">
                
                {/* Left Section - Project Details */}
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-semibold text-amber-300">{project.name}</h1>

                    {/* Project Description with New Line, Bullet Point, and Bold Handling */}
                    <div className="mt-6 text-gray-300">{processText(project.description)}</div>

                    

                    {/* Tech Stack Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.techstack?.split(" ").map((tech, index) => (
                                <span key={index} className="px-4 py-2 bg-gray-800 text-white rounded-full text-lg md:text-xl font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {/* Buttons Section (GitHub + Store Badges) */}
                    <div className="mt-20 flex flex-wrap gap-4 items-center">
                        {/* GitHub Button */}
                        <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2 py-[10px] border-2 border-gray-600 bg-[#000000] text-white rounded-lg text-lg md:text-xl transition-transform duration-500 hover:scale-105"
                        >
                            <FaGithub size={30} />
                            View on GitHub
                        </a>

                        {/* Google Play & App Store Buttons */}
                        {project.playstore && (
                            <a href={project.playstore} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="/googleplaybadge.png" 
                                    alt="Get it on Google Play"
                                    className="w-40 md:w-43 h-13 transition-transform duration-200 hover:scale-105"
                                />
                            </a>
                        )}
                        {project.ios && (
                            <a href={project.ios} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src="/appstore.png" 
                                    alt="Download on the App Store"
                                    className="w-40 md:w-40 h-13 transition-transform duration-200 hover:scale-105"
                                />
                            </a>
                        )}
                    </div>
                    </div>
                </div>
                
                {/* Right Section - Project Images (Fixed for Larger Screens) */}
                <div className="w-full lg:w-2/5 relative hidden lg:block">
                    <div className="sticky top-20 space-y-6">
                        <img src={project.imageUrl} alt={project.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                        <img src={project.imageUrl1} alt={project.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                        <img src={project.imageUrl2} alt={project.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                        <img src={project.imageUrl3} alt={project.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Mobile View - Scrollable Images */}
                <div className="w-full lg:hidden flex flex-col gap-6">
                    <img src={project.imageUrl} alt={project.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    <img src={project.imageUrl1} alt={project.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    <img src={project.imageUrl2} alt={project.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    <img src={project.imageUrl3} alt={project.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                </div>
                
            </div>
            
        </div>
        
    );
}
