import React from 'react';
import { Info, X } from 'lucide-react';

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 relative">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <Info size={24} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome to Performance Test Timeline
            </h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>
              This visualization shows the execution timeline of your performance tests,
              with a focus on the number of virtual users (VUsers) configured for each test run.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Key Points:</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-800">
                <li>Each vertical line represents a test execution</li>
                <li>The color intensity indicates the total number of target VUsers</li>
                <li>Weekend periods are highlighted with a subtle gray background</li>
                <li>This visualization shows test execution timing and scale, not test results</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Getting Started:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Import your test data using the import button</li>
                <li>Use the date range filter to focus on specific periods</li>
                <li>Toggle tests visibility using the eye icon</li>
                <li>Drag and drop test rows to customize their order</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDialog;