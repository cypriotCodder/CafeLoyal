import { MapPin, Clock, Phone, Mail } from 'lucide-react';

function About() {
    return (
        <div className="container mx-auto p-4 pb-24 md:pb-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">About Cafe Loyal</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <img
                        src="https://placehold.co/800x400/1a1a1a/white?text=Cafe+Interior"
                        alt="Cafe Interior"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6 md:p-8">
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Founded in 2025, Cafe Loyal is dedicated to serving the finest ethically sourced coffee in a warm and inviting atmosphere.
                            We believe in community, quality, and the simple joy of a perfect cup of coffee. Whether you're here to work,
                            catch up with friends, or just grab a quick pick-me-up, we're here to make your day a little brighter.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-black shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Visit Us</h3>
                                    <p className="text-gray-600 text-sm">123 Coffee Lane<br />Brew City, BC 90210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Clock className="text-black shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Opening Hours</h3>
                                    <p className="text-gray-600 text-sm">Mon - Fri: 7am - 7pm<br />Sat - Sun: 8am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="text-black shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Contact</h3>
                                    <p className="text-gray-600 text-sm">+90 (548) 825 90 09</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="text-black shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600 text-sm">hello@cafeloyal.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
