const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable').default;
const fs = require('fs');
const path = require('path');

// ==========================================
// PDF BUILDER HELPER CLASS
// ==========================================
class PDFDocumentBuilder {
  constructor(docTitle, docSubtitle, docId) {
    this.doc = new jsPDF({ format: 'a4', unit: 'mm' });
    this.docTitle = docTitle;
    this.docSubtitle = docSubtitle;
    this.docId = docId;
    this.pageWidth = 210;
    this.pageHeight = 297;
    this.marginLeft = 15;
    this.marginRight = 15;
    this.marginTop = 22;
    this.marginBottom = 22;
    this.contentWidth = this.pageWidth - this.marginLeft - this.marginRight;
    this.currentY = this.marginTop;
    this.primaryColor = [30, 41, 59];    // Slate 800
    this.secondaryColor = [37, 99, 235]; // Blue 600
    this.accentColor = [13, 148, 136];   // Teal 600
    this.textColor = [15, 23, 42];       // Slate 900
    this.mutedColor = [100, 116, 139];   // Slate 500
    this.cardBg = [248, 250, 252];       // Slate 50
    this.borderColor = [226, 232, 240];  // Slate 200
  }

  checkPageBreak(neededHeight) {
    if (this.currentY + neededHeight > this.pageHeight - this.marginBottom) {
      this.doc.addPage();
      this.currentY = this.marginTop;
    }
  }

  addCoverPage(meta) {
    // Elegant decorative cover
    const doc = this.doc;
    
    // Top colored banner
    doc.setFillColor(30, 41, 59); // Dark slate
    doc.rect(0, 0, this.pageWidth, 80, 'F');

    // Accent line
    doc.setFillColor(37, 99, 235); // Blue accent
    doc.rect(0, 80, this.pageWidth, 4, 'F');

    // Top logo / category tag
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(147, 197, 253); // Light blue
    doc.text('UNILANG PLATFORM ENGINEERING & ARCHITECTURE', this.marginLeft, 32);

    // Document Main Title
    doc.setFontSize(23);
    doc.setTextColor(255, 255, 255);
    const titleLines = doc.splitTextToSize(this.docTitle, this.contentWidth);
    doc.text(titleLines, this.marginLeft, 46);

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(203, 213, 225); // Slate 300
    const subtitleLines = doc.splitTextToSize(this.docSubtitle, this.contentWidth);
    doc.text(subtitleLines, this.marginLeft, 68);

    // White area content
    let y = 105;

    // Overview Badge
    doc.setFillColor(239, 246, 255);
    doc.setDrawColor(191, 219, 254);
    doc.roundedRect(this.marginLeft, y, this.contentWidth, 38, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(29, 78, 216);
    doc.text('DOCUMENT EXECUTIVE PURPOSE', this.marginLeft + 6, y + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    const desc = meta.description || 'This document defines the formal engineering baseline, specifications, and execution instructions for the UniLang ecosystem.';
    const descLines = doc.splitTextToSize(desc, this.contentWidth - 12);
    doc.text(descLines, this.marginLeft + 6, y + 17);

    y += 50;

    // Metadata Table
    const metaBody = [
      ['Document ID', this.docId],
      ['Document Version', meta.version || '1.0 Final'],
      ['Classification', meta.classification || 'Engineering Standard & Execution Blueprint'],
      ['Target Systems', 'UniLang Web App (React 18 + Vite), Future Backend & AI Orchestrator'],
      ['Publication Date', meta.date || 'November 2026'],
      ['Repository Target', 'c:\\Users\\yadav\\OneDrive\\Desktop\\UNILANG'],
      ['Implementation Status', meta.status || 'Active Build Planning & Prompt Foundation']
    ];

    autoTable(doc, {
      startY: y,
      margin: { left: this.marginLeft, right: this.marginRight },
      head: [['Specification Attribute', 'Document Metadata']],
      body: metaBody,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 55, fontStyle: 'bold', textColor: [51, 65, 85] },
        1: { textColor: [15, 23, 42] }
      },
      styles: {
        fontSize: 9,
        cellPadding: 3.5,
        lineColor: [226, 232, 240]
      }
    });

    y = doc.lastAutoTable.finalY + 15;

    // Key Highlights Box
    if (meta.highlights && meta.highlights.length > 0) {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(this.marginLeft, y, this.contentWidth, 48, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(30, 41, 59);
      doc.text('CRITICAL EXECUTIVE SUMMARY HIGHLIGHTS', this.marginLeft + 6, y + 8);

      let hy = y + 15;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(71, 85, 105);
      for (const h of meta.highlights) {
        doc.setFillColor(37, 99, 235);
        doc.circle(this.marginLeft + 8, hy - 1, 1.2, 'F');
        doc.text(h, this.marginLeft + 13, hy);
        hy += 6.5;
      }
    }

    // Add first page break for content
    doc.addPage();
    this.currentY = this.marginTop;
  }

  addHeading1(text) {
    this.checkPageBreak(20);
    const doc = this.doc;
    
    // Colored accent block behind heading
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(this.marginLeft, this.currentY - 1, this.contentWidth, 10.5, 2, 2, 'F');

    // Left color bar
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(this.marginLeft, this.currentY - 1, 3.5, 10.5, 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(30, 41, 59);
    doc.text(text, this.marginLeft + 7, this.currentY + 6.2);

    this.currentY += 15;
  }

  addHeading2(text) {
    this.checkPageBreak(14);
    const doc = this.doc;
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235); // Blue
    doc.text(text, this.marginLeft, this.currentY + 2);

    // Thin underline
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(this.marginLeft, this.currentY + 4, this.marginLeft + this.contentWidth, this.currentY + 4);

    this.currentY += 9;
  }

  addHeading3(text) {
    this.checkPageBreak(10);
    const doc = this.doc;
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105); // Slate 600
    doc.text(text, this.marginLeft, this.currentY + 1);

    this.currentY += 6;
  }

  addParagraph(text) {
    const doc = this.doc;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);

    const lines = doc.splitTextToSize(text, this.contentWidth);
    const neededHeight = lines.length * 4.6 + 2;
    this.checkPageBreak(neededHeight);

    doc.text(lines, this.marginLeft, this.currentY);
    this.currentY += neededHeight;
  }

  addBullet(prefix, text) {
    const doc = this.doc;
    this.checkPageBreak(8);

    doc.setFillColor(37, 99, 235);
    doc.circle(this.marginLeft + 3, this.currentY - 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(30, 41, 59);
    const prefixWidth = doc.getTextWidth(prefix + ' ');
    doc.text(prefix + ' ', this.marginLeft + 7, this.currentY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const remainingWidth = this.contentWidth - 7 - prefixWidth;
    const lines = doc.splitTextToSize(text, remainingWidth);

    if (lines.length === 1) {
      doc.text(lines[0], this.marginLeft + 7 + prefixWidth, this.currentY);
      this.currentY += 5.2;
    } else {
      doc.text(lines[0], this.marginLeft + 7 + prefixWidth, this.currentY);
      const subLines = lines.slice(1);
      const subLinesText = doc.splitTextToSize(subLines.join(' '), this.contentWidth - 7);
      doc.text(subLinesText, this.marginLeft + 7, this.currentY + 4.5);
      this.currentY += 4.5 + subLinesText.length * 4.4 + 1.5;
    }
  }

  addCallout(title, body, type = 'info') {
    const doc = this.doc;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.7);
    const bodyLines = doc.splitTextToSize(body, this.contentWidth - 14);
    const boxHeight = 12 + bodyLines.length * 4.3;

    this.checkPageBreak(boxHeight + 4);

    let bgColor = [239, 246, 255];    // light blue
    let borderColor = [59, 130, 246];  // blue
    let titleColor = [29, 78, 216];

    if (type === 'gap' || type === 'danger') {
      bgColor = [254, 242, 242];      // light red
      borderColor = [239, 68, 68];     // red
      titleColor = [185, 28, 28];
    } else if (type === 'warning') {
      bgColor = [255, 251, 235];      // light amber
      borderColor = [245, 158, 11];    // amber
      titleColor = [180, 83, 9];
    } else if (type === 'success') {
      bgColor = [240, 253, 244];      // light green
      borderColor = [34, 197, 94];     // green
      titleColor = [21, 128, 61];
    }

    doc.setFillColor(...bgColor);
    doc.roundedRect(this.marginLeft, this.currentY, this.contentWidth, boxHeight, 2, 2, 'F');

    // Solid accent stripe on left
    doc.setFillColor(...borderColor);
    doc.roundedRect(this.marginLeft, this.currentY, 3, boxHeight, 1, 1, 'F');

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(...titleColor);
    doc.text(title, this.marginLeft + 7, this.currentY + 6.5);

    // Body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(51, 65, 85);
    doc.text(bodyLines, this.marginLeft + 7, this.currentY + 12.5);

    this.currentY += boxHeight + 4;
  }

  addTable(head, body, options = {}) {
    this.checkPageBreak(25);
    const doc = this.doc;

    autoTable(doc, {
      startY: this.currentY,
      margin: { left: this.marginLeft, right: this.marginRight },
      head: [head],
      body: body,
      theme: 'grid',
      headStyles: {
        fillColor: options.headColor || [30, 41, 59],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5,
        cellPadding: 3
      },
      columnStyles: options.colStyles || {},
      styles: {
        fontSize: 8,
        cellPadding: 2.8,
        lineColor: [226, 232, 240],
        textColor: [51, 65, 85]
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    this.currentY = doc.lastAutoTable.finalY + 6;
  }

  finalizeAndSave(outputPath) {
    const totalPages = this.doc.internal.getNumberOfPages();
    
    // Add running header & footer to all pages except cover page (page 1)
    for (let i = 2; i <= totalPages; i++) {
      this.doc.setPage(i);
      
      // Top Header
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(7.5);
      this.doc.setTextColor(148, 163, 184); // Muted slate
      this.doc.text(this.docTitle.toUpperCase(), this.marginLeft, 12);
      this.doc.text(`DOC ID: ${this.docId}`, this.pageWidth - this.marginRight, 12, { align: 'right' });
      
      this.doc.setDrawColor(226, 232, 240);
      this.doc.setLineWidth(0.3);
      this.doc.line(this.marginLeft, 14, this.pageWidth - this.marginRight, 14);

      // Bottom Footer
      this.doc.line(this.marginLeft, this.pageHeight - 14, this.pageWidth - this.marginRight, this.pageHeight - 14);
      this.doc.text('UNILANG ARCHITECTURE & SPECIFICATION SPEC · INTERNAL & CONFIDENTIAL', this.marginLeft, this.pageHeight - 9);
      this.doc.text(`Page ${i} of ${totalPages}`, this.pageWidth - this.marginRight, this.pageHeight - 9, { align: 'right' });
    }

    const buf = Buffer.from(this.doc.output('arraybuffer'));
    fs.writeFileSync(outputPath, buf);
    console.log(`Document saved: ${outputPath} (${buf.length} bytes, ${totalPages} pages)`);
    return { path: outputPath, bytes: buf.length, pages: totalPages };
  }
}

module.exports = { PDFDocumentBuilder };
