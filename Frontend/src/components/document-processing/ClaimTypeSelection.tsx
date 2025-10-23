'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, TreePine } from "lucide-react";
import { ClaimType } from "./types";

interface ClaimTypeSelectionProps {
  onClaimTypeSelect: (claimType: ClaimType) => void;
  selectedClaimType: ClaimType | null;
}

export function ClaimTypeSelection({ onClaimTypeSelect, selectedClaimType }: ClaimTypeSelectionProps) {
  const claimTypes = [
    {
      id: 'individual_rights' as ClaimType,
      title: 'Individual Forest Land Rights',
      subtitle: 'CLAIM FORM FOR RIGHTS TO FOREST LAND (Individual)',
      description: 'For individual claims to forest land rights under Section 3(1)(a) of the Forest Rights Act',
      icon: FileText,
      features: [
        'Habitation rights',
        'Self-cultivation rights',
        'In-situ rehabilitation',
        'Traditional occupation claims'
      ],
      color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
    },
    {
      id: 'community_rights' as ClaimType,
      title: 'Community Forest Rights',
      subtitle: 'CLAIM FORM FOR COMMUNITY RIGHTS',
      description: 'For community-based forest rights and collective forest management',
      icon: Users,
      features: [
        'Community forest management',
        'Collective land rights',
        'Traditional governance',
        'Community conservation'
      ],
      color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
    },
    {
      id: 'community_forest_resource' as ClaimType,
      title: 'Community Forest Resource Rights',
      subtitle: 'CLAIM FORM FOR RIGHTS TO COMMUNITY FOREST RESOURCE',
      description: 'For access and use rights to forest resources by forest communities',
      icon: TreePine,
      features: [
        'NTFP collection rights',
        'Grazing rights',
        'Water body access',
        'Traditional resource use'
      ],
      color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Select Claim Type</CardTitle>
        <p className="text-muted-foreground">
          Choose the type of Forest Rights Act claim you want to process
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {claimTypes.map((claim) => {
            const Icon = claim.icon;
            const isSelected = selectedClaimType === claim.id;
            
            return (
              <Card 
                key={claim.id}
                className={`cursor-pointer transition-all duration-200 h-full flex flex-col ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
                } ${claim.color}`}
                onClick={() => onClaimTypeSelect(claim.id)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-4 rounded-full ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-white dark:bg-gray-800 text-primary shadow-md'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      {claim.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs mb-3 px-3 py-1">
                      {claim.subtitle}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center flex-grow">
                    {claim.description}
                  </p>
                  
                  <div className="space-y-2 mt-auto">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 text-center">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {claim.features.map((feature, index) => (
                        <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        ✓ Selected
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {selectedClaimType && (
          <div className="flex justify-center pt-6">
            <Button size="lg" className="px-12 py-3 text-base font-medium">
              Continue with Selected Claim Type →
            </Button>
          </div>
        )}
        
        {/* Information Card */}
        <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
              Important Notes:
            </h4>
            <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
              <li>• This is a simulation tool for document processing</li>
              <li>• All data shown is mock data for demonstration purposes</li>
              <li>• For actual claims, please visit your local Forest Department</li>
              <li>• Sample data is based on Tripura state locations</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}