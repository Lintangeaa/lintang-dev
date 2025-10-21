// PDF Configuration - Easy to edit settings
export const pdfConfig = {
  // Company Information
  company: {
    name: 'SOULCODE',
    tagline: 'Where Code Meets Soul',
    logo: '/images/soulcode-logo.png',
  },
  
  // PDF Layout Settings
  layout: {
    pagePadding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  
  // Colors
  colors: {
    primary: '#000000',
    secondary: '#6b7280',
    accent: '#059669',
    background: '#ffffff',
    lightGray: '#f3f4f6',
    border: '#e5e7eb',
  },
  
  // Text Content
  text: {
    invoiceTitle: 'Invoice',
    totalLabel: 'Total',
    colorsLabel: 'Colors:',
    phoneLabel: 'Phone:',
    serviceIdLabel: 'Service ID:',
    billToLabel: 'Bill To',
    projectLabel: 'Project',
    dateLabel: 'Date',
    itemLabel: 'Item',
    descriptionLabel: 'Description',
    amountLabel: 'Amount',
    websiteServiceLabel: 'Website Service',
    colorChoiceLabel: 'Warna pilihan:',
    thankYouMessage: 'Terima kasih atas kepercayaannya. Pembayaran dilakukan sesuai kesepakatan.',
  },
  
  // Layout Sections
  sections: {
    header: {
      logoSize: 60,
      companyNameSize: 24,
      taglineSize: 10,
    },
    colors: {
      boxSize: 16,
      marginBottom: 20,
    },
    details: {
      marginBottom: 30,
      columnGap: 30,
    },
    total: {
      marginBottom: 30,
      amountSize: 24,
    },
    table: {
      marginBottom: 30,
      headerPadding: 12,
      rowPadding: 12,
    },
    footer: {
      marginTop: 40,
      paddingTop: 20,
    },
  },
};
