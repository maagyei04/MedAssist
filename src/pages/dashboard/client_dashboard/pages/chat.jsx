import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Am MedAssist powered AI Healthcare chatbot, How may i be of help ?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: inputValue,
        isBot: false
      }]);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Welcome Header - Static */}
      <div className="flex-none fixed top-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white shadow-sm"
        >
          <h1 className="text-xl font-semibold">Welcome User! .</h1>
          <p className="text-gray-600 mt-1">
            AI generated insights based on input data,
            feel free to chat with our AI-assistant...
          </p>
        </motion.div>
      </div>

      {/* Chat Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 mt-24 mb-24">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.isBot
                    ? 'bg-white shadow-md text-gray-800'
                    : 'bg-green-500 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Static */}
      <div className="fixed bottom-0 left-0 lg:left-80 right-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white border-t"
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <PlusOutlined className="text-gray-500 text-xl" />
            </button>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Please input your prompt here..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <SendOutlined className="text-xl" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatInterface;