import { useState, useEffect } from 'react';
import { Download, Loader2, AlertCircle, Check, Smartphone } from 'lucide-react';
import { useToast } from './hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from './ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const GitHubReleaseDownloader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const { t } = useTranslation('aboutPage');
  const [showAlert, setShowAlert] = useState(false);
  const isMobile = useIsMobile();

  const downloadLatestRelease = async () => {
    if (isMobile) {
      const mobileError = t('mobileError', 'Downloads are only available on desktop devices.');
      setError(mobileError);
      setShowAlert(true);
      toast({
        variant: 'destructive',
        title: t('downloadUnavailable', 'Download Unavailable'),
        description: mobileError,
      });
      return;
    }

    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      const owner = 'xdmanus1';
      const repo = 'Unity-Game-Project-2024-2025-IKT-App';

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases/latest`
      );

      if (!response.ok) {
        throw new Error(t('fetchError', 'Failed to fetch release information'));
      }

      const release = await response.json();

      const exeAsset = release.assets.find((asset: { name: string }) =>
        asset.name.toLowerCase().endsWith('.exe')
      );

      if (!exeAsset) {
        setError(t('noExeError', 'No executable found in the latest release. Please check back later.'));
        setShowAlert(true);
        return;
      }

      const downloadUrl = exeAsset.browser_download_url;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = exeAsset.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSuccess(true);

      toast({
        title: t('downloadSuccess', 'Download Successful'),
        description: t('downloadSuccessDesc', 'The file has been downloaded successfully.'),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('genericError', 'An error occurred');
      setError(errorMessage);
      setShowAlert(true);
      toast({
        variant: 'destructive',
        title: t('downloadFailed', 'Download Failed'),
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 right-4 w-80 z-50"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={downloadLatestRelease}
        disabled={isLoading || isSuccess || isMobile}
        className={`font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center gap-2 
          ${isMobile 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'} 
          disabled:opacity-50 disabled:cursor-not-allowed`}
        whileHover={{ scale: isLoading || isSuccess || isMobile ? 1 : 1.05 }}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : isSuccess ? (
          <Check />
        ) : isMobile ? (
          <Smartphone />
        ) : (
          <Download />
        )}
        {isLoading 
          ? t('downloading') 
          : isSuccess 
          ? t('downloaded') 
          : isMobile 
          ? t('desktopOnly', "Csak asztali számítógép") 
          : t('download')}
      </motion.button>
    </div>
  );
};

export default GitHubReleaseDownloader;