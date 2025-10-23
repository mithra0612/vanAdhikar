'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Edit3, CheckCircle, LockKeyhole } from "lucide-react";
import { ExtractedField } from "./types";

interface DataReviewProps {
  extractedFields: ExtractedField[];
  onFieldUpdate: (fieldIndex: number, newValue: string) => void;
  onFieldLock: (fieldIndex: number, isLocked: boolean) => void;
  onLockAll: () => void;
  onContinue: () => void;
  allFieldsLocked: boolean;
}

export function DataReview({ 
  extractedFields, 
  onFieldUpdate, 
  onFieldLock, 
  onLockAll,
  onContinue,
  allFieldsLocked 
}: DataReviewProps) {
  const [editingField, setEditingField] = useState<number | null>(null);
  const [tempValues, setTempValues] = useState<{[key: number]: string}>({});

  const handleEdit = (index: number) => {
    if (!extractedFields[index].isLocked) {
      setEditingField(index);
      setTempValues({ ...tempValues, [index]: extractedFields[index].verifiedValue });
    }
  };

  const handleSave = (index: number) => {
    const newValue = tempValues[index] || extractedFields[index].verifiedValue;
    onFieldUpdate(index, newValue);
    setEditingField(null);
    setTempValues({ ...tempValues, [index]: "" });
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValues({});
  };

  const canContinue = extractedFields.every(field => field.isLocked || field.confidence > 70);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Review & Verify Extracted Data
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onLockAll}
              className="flex items-center gap-2"
            >
              <LockKeyhole className="h-4 w-4" />
              {allFieldsLocked ? 'Unlock All' : 'Lock All'}
            </Button>
          </div>
        </CardTitle>
        <p className="text-muted-foreground">
          Review the extracted information and make corrections if needed. Lock fields when verified.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {extractedFields.length}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Fields</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {extractedFields.filter(f => f.isLocked).length}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">Locked Fields</p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {extractedFields.filter(f => f.isEdited).length}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">Edited Fields</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {Math.round(extractedFields.reduce((acc, f) => acc + f.confidence, 0) / extractedFields.length)}%
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">Avg Confidence</p>
            </CardContent>
          </Card>
        </div>

        {/* Fields Review */}
        <div className="space-y-4">
          {extractedFields.map((field, index) => (
            <Card 
              key={index}
              className={`transition-all duration-200 ${
                field.confidence < 70 ? 'border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/50' : ''
              } ${field.isLocked ? 'bg-green-50/30 border-green-500/30 dark:bg-green-950/30 dark:border-green-400/30' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <h3 className="font-medium text-sm">{field.field}</h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={field.confidence > 90 ? "default" : field.confidence > 70 ? "secondary" : "destructive"}
                      >
                        {field.confidence}%
                      </Badge>
                      {field.isEdited && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          Edited
                        </Badge>
                      )}
                      {field.isLocked && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFieldLock(index, !field.isLocked)}
                      className={field.isLocked ? 'text-green-600 border-green-600' : ''}
                    >
                      {field.isLocked ? (
                        <>
                          <Unlock className="h-3 w-3 mr-1" />
                          Unlock
                        </>
                      ) : (
                        <>
                          <Lock className="h-3 w-3 mr-1" />
                          Lock
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {editingField === index ? (
                  <div className="space-y-3">
                    {field.field.toLowerCase().includes('address') || 
                     field.field.toLowerCase().includes('evidence') || 
                     field.field.toLowerCase().includes('information') ? (
                      <Textarea
                        value={tempValues[index] || field.verifiedValue}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTempValues({ 
                          ...tempValues, 
                          [index]: e.target.value 
                        })}
                        className="w-full"
                        placeholder="Enter correct value"
                        rows={3}
                      />
                    ) : (
                      <Input
                        type="text"
                        value={tempValues[index] || field.verifiedValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempValues({ 
                          ...tempValues, 
                          [index]: e.target.value 
                        })}
                        className="w-full"
                        placeholder="Enter correct value"
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleSave(index)}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Extracted Value:</p>
                      <div className="p-2 bg-muted rounded-md">
                        <p className="text-sm font-mono">{field.extractedValue}</p>
                      </div>
                    </div>
                    
                    {field.isEdited && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Corrected Value:</p>
                        <div className="p-2 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md">
                          <p className="text-sm font-mono text-green-800 dark:text-green-200">
                            {field.verifiedValue}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {!field.isLocked && (
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onContinue}
            disabled={!canContinue}
            size="lg"
            className="px-8"
          >
            {canContinue ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Continue to Map Processing
              </>
            ) : (
              'Review Low Confidence Fields'
            )}
          </Button>
        </div>

        {/* Help Text */}
        {!canContinue && (
          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                Action Required:
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Please review and verify fields with low confidence scores (below 70%) or lock them to proceed.
                Fields with low confidence are highlighted in orange.
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}