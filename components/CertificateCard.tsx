"use client";

import { Certificate } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{certificate.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {certificate.issuer}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{certificate.issue_date}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      {certificate.certificate_url && (
        <CardContent>
          <a
            href={certificate.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Certificate
            </Button>
          </a>
        </CardContent>
      )}
    </Card>
  );
}
