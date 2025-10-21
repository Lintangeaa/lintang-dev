import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { OrderItem } from '@/lib/api/ordersClient';
import { pdfConfig } from './pdfConfig';

// PDF Styles - Centralized styling for easy editing
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: pdfConfig.colors.background,
    padding: pdfConfig.layout.pagePadding,
    fontSize: pdfConfig.layout.fontSize,
    fontFamily: pdfConfig.layout.fontFamily,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottom: '1pt solid #e5e7eb',
    paddingBottom: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: pdfConfig.sections.header.logoSize,
    height: pdfConfig.sections.header.logoSize,
    marginRight: 15,
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: pdfConfig.sections.header.companyNameSize,
    fontWeight: 'bold',
    color: pdfConfig.colors.primary,
    marginBottom: 5,
  },
  companyTagline: {
    fontSize: pdfConfig.sections.header.taglineSize,
    color: pdfConfig.colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  invoiceInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  colorsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  colorLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginRight: 10,
  },
  colorBox: {
    width: 16,
    height: 16,
    marginRight: 5,
    border: '1pt solid #d1d5db',
  },
  colorText: {
    fontSize: 10,
    color: '#6b7280',
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  leftColumn: {
    flex: 1,
    marginRight: 30,
  },
  rightColumn: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  sectionValue: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  sectionValueNormal: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 15,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  totalLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  table: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 12,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e5e7eb',
    padding: 12,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: '#000000',
  },
  serviceInfo: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 5,
  },
  tableFooter: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  tableFooterCell: {
    flex: 1,
    fontSize: 12,
    color: '#000000',
  },
  tableFooterTotal: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1pt solid #e5e7eb',
  },
  footerText: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 10,
  },
  footerNote: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
  },
});

// Main PDF Document Component - All in one
interface InvoiceDocumentProps {
  order: OrderItem;
  invoiceNo: string;
}

export const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ order, invoiceNo }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <View style={pdfStyles.logoSection}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={pdfStyles.logo}
            src={pdfConfig.company.logo}
          />
        </View>
        <View style={pdfStyles.invoiceInfo}>
          <Text style={pdfStyles.invoiceTitle}>{pdfConfig.text.invoiceTitle}</Text>
          <Text style={pdfStyles.invoiceNumber}>{invoiceNo}</Text>
        </View>
      </View>

      {/* Colors Section */}
      <View style={pdfStyles.colorsSection}>
        <Text style={pdfStyles.colorLabel}>{pdfConfig.text.colorsLabel}</Text>
        <View style={[pdfStyles.colorBox, { backgroundColor: order.colorPrimary }]} />
        <View style={[pdfStyles.colorBox, { backgroundColor: order.colorSecondary }]} />
        <Text style={pdfStyles.colorText}>{order.colorPrimary} / {order.colorSecondary}</Text>
      </View>

      {/* Details Grid */}
      <View style={pdfStyles.detailsGrid}>
        <View style={pdfStyles.leftColumn}>
          <Text style={pdfStyles.sectionTitle}>{pdfConfig.text.dateLabel}</Text>
          <Text style={pdfStyles.sectionValueNormal}>
            {new Date().toLocaleString()}
          </Text>
          
          <Text style={pdfStyles.sectionTitle}>{pdfConfig.text.billToLabel}</Text>
          <Text style={pdfStyles.sectionValue}>{order.customerName}</Text>
          <Text style={pdfStyles.sectionValueNormal}>{order.companyName}</Text>
          <Text style={pdfStyles.sectionValueNormal}>{pdfConfig.text.phoneLabel} {order.whatsapp}</Text>
        </View>
        
        <View style={pdfStyles.rightColumn}>
          <Text style={pdfStyles.sectionTitle}>{pdfConfig.text.projectLabel}</Text>
          <Text style={pdfStyles.sectionValue}>{order.websiteName}</Text>
        </View>
      </View>

      {/* Total Section */}
      <View style={pdfStyles.totalSection}>
        <Text style={pdfStyles.totalLabel}>{pdfConfig.text.totalLabel}</Text>
        <Text style={pdfStyles.totalAmount}>
          Rp {order.totalPrice.toLocaleString('id-ID')}
        </Text>
      </View>

      {/* Table */}
      <View style={pdfStyles.table}>
        <View style={pdfStyles.tableHeader}>
          <Text style={pdfStyles.tableHeaderCell}>{pdfConfig.text.itemLabel}</Text>
          <Text style={pdfStyles.tableHeaderCell}>{pdfConfig.text.descriptionLabel}</Text>
          <Text style={[pdfStyles.tableHeaderCell, { textAlign: 'right' }]}>{pdfConfig.text.amountLabel}</Text>
        </View>
        <View style={pdfStyles.tableRow}>
          <Text style={pdfStyles.tableCell}>{order.serviceName}</Text>
          <Text style={pdfStyles.tableCell}>
            {order.description}
          </Text>
          <Text style={[pdfStyles.tableCell, { textAlign: 'right' }]}>
            Rp {order.totalPrice.toLocaleString('id-ID')}
          </Text>
        </View>
        <View style={pdfStyles.tableFooter}>
          <Text style={pdfStyles.tableFooterCell}></Text>
          <Text style={pdfStyles.tableFooterCell}></Text>
          <Text style={pdfStyles.tableFooterTotal}>
            Rp {order.totalPrice.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={pdfStyles.footer}>
        <Text style={pdfStyles.footerText}>
          {pdfConfig.text.colorChoiceLabel} {order.colorPrimary} / {order.colorSecondary}
        </Text>
        <Text style={pdfStyles.footerNote}>
          {pdfConfig.text.thankYouMessage}
        </Text>
      </View>
    </Page>
  </Document>
);

export const generateInvoicePDF = async (order: OrderItem, invoiceNo: string): Promise<Blob> => {
  const doc = <InvoiceDocument order={order} invoiceNo={invoiceNo} />;
  return await pdf(doc).toBlob();
};

export const downloadInvoicePDF = async (order: OrderItem, invoiceNo: string, filename?: string) => {
  try {
    const blob = await generateInvoicePDF(order, invoiceNo);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `invoice-${order.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
};
