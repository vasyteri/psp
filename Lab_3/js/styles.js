const styles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: #e9f0f5;
        font-family: Arial, sans-serif;
    }
    
    .header {
        background: white;
        padding: 16px;
        border-bottom: 1px solid #d1e0eb;
    }
    
    .header-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .nav-button {
        color: #007FFF;
        padding: 8px 16px;
        text-decoration: none;
        font-weight: bold;
    }
    
    .nav-button:hover { color: red; }
    
    .main {
        flex: 1;
        padding: 32px;
        display: flex;
        justify-content: center;
    }
    
    .content-card {
        background: white;
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 1200px;
    }
    
    .footer {
        background: #007FFF;
        color: white;
        text-align: center;
        padding: 16px;
    }
    
    .calculator-container .content-card { max-width: 450px; }
    
    .result {
        background: #f8f9fa;
        border: 2px solid #e9ecef;
        border-radius: 15px;
        text-align: right;
        font-size: 36px;
        font-weight: bold;
        padding: 20px;
        margin-bottom: 20px;
    }
    
    .buttons-container { display: flex; flex-direction: column; gap: 10px; }
    .button-row { display: flex; justify-content: space-between; gap: 10px; }
    
    .my-btn {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: none;
        background: #e9ecef;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .my-btn.primary { background: #007FFF; color: white; }
    .my-btn.secondary { background: #28a745; color: white; }
    .my-btn.execute { width: 152px; border-radius: 35px; background: #28a745; color: white; }
    
    .weather-details {
        color: #666;
        line-height: 1.8;
    }
    
    .add-card-form {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 15px;
        margin-top: 20px;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group input, .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    
    .add-card-btn, .btn-details {
        background: #007FFF;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
    }
    
    .delete-btn {
        background: #dc3545;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }
    
    .delete-btn:hover { 
        background: #c82333; 
        transform: scale(1.05);
    }
    
    .add-card-btn:hover, .btn-details:hover { background: #0056b3; }
    
    .back-button {
        background: #007FFF;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
    }
    
    .accordion-button .delete-btn {
        position: relative;
        z-index: 10;
    }
    
    .snowflake-sidebar-3d {
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border-radius: 20px;
        padding: 20px;
        width: 340px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .content-card-3d {
        background: white;
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 1200px;
        transition: transform 0.3s, box-shadow 0.3s;
        transform-style: preserve-3d;
        position: relative;
        overflow: hidden;
    }
    
    .content-card-3d:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    
    .temp-now-3d {
        font-size: 72px;
        font-weight: bold;
        margin: 30px 0;
        color: #007FFF;
        transition: transform 0.3s ease;
        display: inline-block;
    }
    
    .content-card-3d:hover .temp-now-3d {
        transform: translateZ(30px);
        text-shadow: 0 10px 20px rgba(0,127,255,0.3);
    }
    
    .content-card-3d h2 {
        transition: transform 0.3s ease;
    }
    
    .content-card-3d:hover h2 {
        transform: translateZ(20px);
    }
    
    .cold-temp-detail {
        color: #4a90e2 !important;
        text-shadow: 0 0 20px rgba(74,144,226,0.5);
        animation: pulseTemp 2s ease-in-out infinite;
    }
    
    @keyframes pulseTemp {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);