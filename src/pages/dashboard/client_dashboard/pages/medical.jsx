import React, { useState } from 'react';
import { Grid, Typography, Box, Modal, Button } from '@mui/material';
import { DocumentTextIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const containerStyle = {
  backgroundColor: 'white',
  padding: '16px',
  margin: '8px 0', 
  borderRadius: '10px',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  }
});

// PDF Document Component
const MedicalRecordPDF = ({ record }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.hospitalName}>{record.hospital}</Text>
        <Text style={styles.title}>Medical Record</Text>
      </View>
       
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{record.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{record.doctor}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{record.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Diagnosis:</Text>
          <Text style={styles.value}>{record.diagnosis}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Prescription:</Text>
          <Text style={styles.value}>{record.prescription}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.value}>{record.notes}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default function MedicalRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState(null);

  // Mock medical records data
  const medicalRecords = [
    {
      id: 1,
      date: "2025-02-15",
      type: "General Checkup",
      doctor: "Dr. Derrick Addo",
      hospital: "City General Hospital",
      diagnosis: "Routine examination - all clear",
      prescription: "N/A",
      notes: "Patient in good health. BP: 120/80, Heart Rate: 72bpm"
    },
    {
      id: 2,
      date: "2025-01-20",
      type: "Blood Test",
      doctor: "Dr. Agyei Michael",
      hospital: "Metropolitan Medical Center",
      diagnosis: "Mild anemia",
      prescription: "Iron supplements",
      notes: "Follow-up recommended in 3 months"
    }
  ];

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedPdf(URL.createObjectURL(file));
      setModalOpen(true);
      setSelectedRecord(null);
    } else {
      alert('Please upload a PDF file');
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Medical Records</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p className="text-sm text-gray-500 mb-4">
            Access and view your complete medical history. Click on any record to view detailed information in hospital format.
          </p>

          <div className="mb-4">
            <label className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Upload Medical Record
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <Box className="shadow-xl shadow-black-600" sx={containerStyle}>
            <div className="grid gap-4">
              {medicalRecords.map((record) => (
                <Box 
                  key={record.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                  onClick={() => handleRecordClick(record)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                      <span className="font-semibold">{record.type}</span>
                    </div>
                    <span className="text-gray-500">{record.date}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-500">Doctor</p>
                      <p className="font-medium">{record.doctor}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Hospital</p>
                      <p className="font-medium">{record.hospital}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Diagnosis</p>
                      <p className="font-medium">{record.diagnosis}</p>
                    </div>
                  </div>
                </Box>
              ))}
            </div>
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (uploadedPdf) {
            URL.revokeObjectURL(uploadedPdf);
            setUploadedPdf(null);
          }
        }}
      >
        <Box sx={modalStyle}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Medical Record</h2>
            <button 
              onClick={() => setModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="h-full">
            {selectedRecord ? (
              <PDFViewer width="100%" height="90%">
                <MedicalRecordPDF record={selectedRecord} />
              </PDFViewer>
            ) : uploadedPdf && (
              <iframe
                src={uploadedPdf}
                width="100%"
                height="90%"
                title="Uploaded Medical Record"
              />
            )} 
          </div>
        </Box>
      </Modal>
    </div>
  );
}
