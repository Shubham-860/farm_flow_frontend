import React from 'react';
import {Card, CardContent} from "@/components/ui/card.jsx";

const About = () => {
    return (
        <div className="min-h-screen px-6 py-3 bg-background text-foreground">

            <div className="max-w-7xl mx-auto space-y-8">

                {/* Title */}
                <div className="text-center space-y-3">
                    <h1 className="text-5xl font-bold tracking-tight">
                        About FarmFlow
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Simple farm management for tracking seasons, expenses, and profits.
                    </p>
                </div>

                {/* Single Card */}
                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-8 space-y-6 text-xl leading-relaxed">

                        <p>
                            <span className="font-semibold">FarmFlow</span> is designed to help
                            farmers easily manage their farms and crop seasons without
                            unnecessary complexity.
                        </p>

                        <p>
                            It allows you to track expenses, record sales, and monitor
                            production — all in one place — giving a clear understanding of
                            your farm’s performance.
                        </p>

                        <p>
                            Instead of complicated systems, FarmFlow focuses on simplicity,
                            speed, and clarity so you can focus more on farming and less on
                            managing data.
                        </p>

                        {/* Features */}
                        <div className="pt-2">
                            <h2 className="text-xl font-semibold mb-3">
                                Key Features
                            </h2>

                            <ul className="space-y-2 text-muted-foreground">
                                <li>• Manage multiple farms</li>
                                <li>• Track crop seasons</li>
                                <li>• Record expenses and sales</li>
                                <li>• View profit and production</li>
                                <li>• Clean and simple dashboard</li>
                            </ul>
                        </div>

                    </CardContent>
                </Card>


            </div>
        </div>
    );
};

export default About;