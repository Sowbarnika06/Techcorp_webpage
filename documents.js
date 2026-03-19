// ============================================
// DOCUMENTS & FILES MANAGEMENT
// ============================================

// Sample documents data
const documents = [
    {
        id: 1,
        name: 'Q1 Financial Report.xlsx',
        type: 'XLSX',
        size: '2.4 MB',
        date: 'Mar 18, 2026',
        owner: 'Sarah Johnson'
    },
    {
        id: 2,
        name: 'Company Handbook.docx',
        type: 'DOCX',
        size: '1.8 MB',
        date: 'Mar 15, 2026',
        owner: 'HR Department'
    },
    {
        id: 3,
        name: 'Product Roadmap 2026.pptx',
        type: 'PPT',
        size: '5.2 MB',
        date: 'Mar 19, 2026',
        owner: 'Product Team'
    },
    {
        id: 4,
        name: 'Privacy Policy.pdf',
        type: 'PDF',
        size: '890 KB',
        date: 'Mar 10, 2026',
        owner: 'Legal Team'
    },
    {
        id: 5,
        name: 'Marketing Budget Q2.xlsx',
        type: 'XLSX',
        size: '1.1 MB',
        date: 'Mar 16, 2026',
        owner: 'Marketing'
    },
    {
        id: 6,
        name: 'Employee Training Guide.pdf',
        type: 'PDF',
        size: '3.5 MB',
        date: 'Mar 14, 2026',
        owner: 'Training Team'
    },
    {
        id: 7,
        name: 'IT Security Standards.docx',
        type: 'DOCX',
        size: '756 KB',
        date: 'Mar 12, 2026',
        owner: 'IT Department'
    }
];

let filteredDocuments = [...documents];
let currentPage = 1;
const itemsPerPage = 10;

// Initialize documents page
document.addEventListener('DOMContentLoaded', function() {
    updateDocumentCount();
    setupSearchFunctionality();
});

// Search functionality
function setupSearchFunctionality() {
    const searchBox = document.getElementById('docSearch');
    if (searchBox) {
        searchBox.addEventListener('input', searchDocuments);
    }
}

function searchDocuments(e) {
    const query = e.target.value.toLowerCase();
    
    if (!query) {
        filteredDocuments = [...documents];
    } else {
        filteredDocuments = documents.filter(doc => 
            doc.name.toLowerCase().includes(query) ||
            doc.type.toLowerCase().includes(query) ||
            doc.owner.toLowerCase().includes(query)
        );
    }
    
    currentPage = 1;
    updateDocumentCount();
}

function filterDocuments() {
    const typeFilter = document.getElementById('typeFilter');
    const selectedType = typeFilter ? typeFilter.value : '';
    
    if (!selectedType) {
        filteredDocuments = [...documents];
    } else {
        filteredDocuments = documents.filter(doc => doc.type === selectedType);
    }
    
    currentPage = 1;
    updateDocumentCount();
    showNotification('Documents filtered', 'info');
}

function sortDocuments() {
    const sortBy = document.getElementById('sortBy');
    const sortValue = sortBy ? sortBy.value : 'name';
    
    switch(sortValue) {
        case 'name':
            filteredDocuments.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'date':
            filteredDocuments.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'size':
            filteredDocuments.sort((a, b) => {
                const sizeA = parseFloat(a.size);
                const sizeB = parseFloat(b.size);
                return sizeB - sizeA;
            });
            break;
    }
    
    currentPage = 1;
    updateDocumentCount();
    showNotification('Documents sorted', 'info');
}

function updateDocumentCount() {
    const docCount = document.getElementById('docCount');
    if (docCount) {
        const total = filteredDocuments.length;
        const displayed = Math.min(itemsPerPage, total - (currentPage - 1) * itemsPerPage);
        docCount.textContent = `Showing ${displayed} of ${total} document${total !== 1 ? 's' : ''}`;
    }
}

function selectAllDocs() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.doc-checkbox');
    checkboxes.forEach(cb => cb.checked = selectAll ? selectAll.checked : false);
}

function deleteDoc() {
    const checkedCount = document.querySelectorAll('.doc-checkbox:checked').length;
    
    if (checkedCount === 0) {
        showNotification('Please select at least one document', 'info');
        return;
    }
    
    if (confirm(`Delete ${checkedCount} document${checkedCount > 1 ? 's' : ''}?`)) {
        // Remove checked documents
        document.querySelectorAll('.doc-checkbox:checked').forEach(cb => {
            const row = cb.closest('tr');
            const docName = row.querySelector('.filename').textContent;
            
            // Remove from filtered array
            filteredDocuments = filteredDocuments.filter(doc => doc.name !== docName);
            // Remove from main array
            documents.splice(documents.findIndex(d => d.name === docName), 1);
        });
        
        updateDocumentCount();
        document.getElementById('selectAll').checked = false;
        showNotification(`${checkedCount} document${checkedCount > 1 ? 's' : ''} deleted successfully`, 'success');
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updateDocumentCount();
        showNotification(`Showing page ${currentPage}`, 'info');
    }
}

function nextPage() {
    const maxPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    if (currentPage < maxPages) {
        currentPage++;
        updateDocumentCount();
        showNotification(`Showing page ${currentPage}`, 'info');
    }
}

// Download document
function downloadDocument(fileName) {
    showNotification(`Downloading ${fileName}...`, 'info');
    // Simulate download
    setTimeout(() => {
        showNotification(`${fileName} downloaded successfully`, 'success');
    }, 1500);
}

// Share document
function shareDocument(fileName) {
    const email = prompt('Enter email address to share with:', '');
    if (email) {
        showNotification(`Sharing ${fileName} with ${email}...`, 'info');
        setTimeout(() => {
            showNotification(`${fileName} shared successfully`, 'success');
        }, 1000);
    }
}
