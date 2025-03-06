import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PatientRecommendation } from "@/components/PatientRecommendation";
import {ReferralManagement } from "@/components/Referrals";
import LandingPage from "./landing";

// Power BI report URLs
const powerBIReports = {
  patientRiskProfiler: "https://app.powerbi.com/reportEmbed?reportId=e711c02c-fda7-499a-8437-dc9d968e176a&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b",
  patientTimeline: "https://app.powerbi.com/reportEmbed?reportId=d2cd67e9-3dd8-4ef1-a5fa-4acfdf344f1e&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b",
  personaComparison: "https://app.powerbi.com/reportEmbed?reportId=8e965572-7d95-408b-8c50-f1d380182039&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b",
  adherenceScorecard: "https://app.powerbi.com/reportEmbed?reportId=fe973fc3-cd2b-4442-b3eb-d9c0441bdc11&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b",
  carevariation:"https://app.powerbi.com/view?r=eyJrIjoiMGIzY2Q0YTgtYmQ3MC00NDA3LThkNGYtZmJhZDlmZTBmOTQ0IiwidCI6IjM5ZDgxNGFiLWE1NmYtNDc4ZC04YjE0LWY0ZjFlOTljZmUxYiJ9"
};

const Index = () => {
  const [selectedPatientId, setSelectedPatientId] = useState("45987");
  const [currentView, setCurrentView] = useState("Landing");
  
  // Function to render the appropriate content based on the current view
  const renderContent = () => {
    // If the view is one of the Power BI reports, render an iframe
    if (Object.keys(powerBIReports).includes(currentView)) {
      return (
        <div className="w-full h-full min-h-[calc(100vh-150px)]">
          <iframe 
            title={currentView}
            width="100%" 
            height="100%" 
            style={{ border: "none", minHeight: "calc(100vh - 150px)" }}
            src={powerBIReports[currentView]}
            allowFullScreen={true}
          ></iframe>  
        </div>
      );
    }

    // Render Referral Management view
    if (currentView === "referralmanagement") {
      return (
        <ReferralManagement/>
      );
    }
  
    if(currentView === "patientrecommendations")
    return (
      <PatientRecommendation 
        selectedPatientId={selectedPatientId} 
        onSelectPatient={setSelectedPatientId} 
      />
    );
  };

  if (currentView !== "Landing")
  
  return (
    
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {currentView === "patientRiskProfiler" && "Patient Risk Profiler"}
              {currentView === "patientTimeline" && "Patient Health Timeline"}
              {currentView === "personaComparison" && "Persona Comparison"}
              {currentView === "adherenceScorecard" && "Adherence & Engagement Scorecard"}
              {currentView === "referralmanagement" && "Referral Management"}
              {currentView === "patientrecommendations" && "Care Voyage: Patient Recommendation"}
            </h1>
          </div>
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
  else 
  return (
    <LandingPage setCurrentView={setCurrentView}/>
  );
};

export default Index;