import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitleAndLanguage, setQuestionAndDescription, setCode, resetForm } from "../../../redux/action";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import axios from "axios";

const Add1 = () => {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.collectionReducer);
    
    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:8000/api/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast.success("Collection ajoutée avec succès !");
            dispatch(resetForm());
            navigate("/");
        } else {
            toast.error("Erreur lors de l'ajout.");
        }
    };

    return (
        <div className="max-w-lg mx-auto text-center p-6 bg-[#21252B] text-white rounded-lg">
            <h2 className="text-2xl mb-6">Étape {step} sur 3</h2>

            {step === 1 && <Step1 onNext={handleNext} />}
            {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <Step3 onBack={handleBack} onSubmit={handleSubmit} formData={formData} />}
        </div>
    );
};

const Step1 = ({ onNext }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");

    const handleNext = () => {
        if (!title || !language) {
            toast.warning("Veuillez remplir tous les champs.");
            return;
        }
        dispatch(setTitleAndLanguage(title, language));
        onNext();
    };

    return (
    
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-2">New collection</h1>
            <p className="text-gray-300 mb-6">
                Create your own collections, share your code, solution, feedback, rates, and your suggestions
            </p>
          
            <div>
                <label className="block text-gray-300 mb-2">name of your collection :</label>
                <input
                    type="text"
                    placeholder=""
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                />
            </div>
            
            <div>
                <label className="block text-gray-300 mb-2">Select language :</label>
                <div className="grid grid-cols-3 gap-2">
                    {["Javascript", "html", "algorithm", "css", "laravel", "react", "php", "python", "Bootstrap"].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang.toLowerCase())}
                            className={`p-2 rounded-md text-sm ${language === lang.toLowerCase() ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            #{lang}
                        </button>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={handleNext}
                className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
                Let's get started
            </button>
        </div>
    );
};

const Step2 = ({ onNext, onBack }) => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState("");
    const [description, setDescription] = useState("");

    const handleNext = () => {
        if (!question || !description) {
            toast.warning("Veuillez remplir tous les champs.");
            return;
        }
        dispatch(setQuestionAndDescription(question, description));
        onNext();
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ajoutez la question et la description</h3>
            <input 
                type="text" 
                placeholder="Question" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                />
            <textarea 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                />
            <div className="flex justify-between mt-4">
                <button 
                    onClick={onBack} 
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Retour
                </button>
                <button 
                    onClick={handleNext} 
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

const Step3 = ({ onBack ,formData}) => {
    const dispatch = useDispatch();
    const [code, setCodeState] = useState("");

    const handleSubmit = async () => {
        if (!code) {
            toast.warning("Veuillez entrer du code.");
            return;
        }

        dispatch(setCode(code));
        console.log(formData);
        
        try {
            const res = await axios.post('/api/collections', formData);
            console.log(res);
            toast.success("Collection ajoutée avec succès !");
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'ajout.");
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ajoutez le code</h3>
<textarea name="" id="" value={code} onChange={(e) => setCodeState(e.target.value)}           className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
 ></textarea>

            <div className="flex justify-between mt-4">
                <button 
                    onClick={onBack} 
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Retour
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Soumettre
                </button>
            </div>
        </div>
    );
};

export default Add1;
