import { configureBackgroundRemoval } from './backgroundRemovalConfig';

/**
 * Removes background from an image file using @imgly/background-removal
 * @param file - The image file to process
 * @returns Promise with the processed image as a File object
 */
export async function removeImageBackground(file: File): Promise<File> {
  console.log('=== Background Removal Start ===');
  console.log('Input file:', {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  try {
    // Try to configure library first (non-blocking)
    try {
      await configureBackgroundRemoval();
    } catch (configError) {
      console.warn('Configuration warning (continuing anyway):', configError);
    }
    
    // Dynamically import to avoid initialization issues
    const { removeBackground } = await import('@imgly/background-removal');
    
    console.log('Library loaded, processing image...');
    
    // Process with HIGH QUALITY settings optimized for ID card photos
    // Increased timeout to 120 seconds for larger images
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Background removal timeout after 120 seconds')), 120000);
    });
    
    const removalPromise = removeBackground(file, {
      output: {
        format: 'image/png',
        quality: 1.0, // MAXIMUM quality - no compression
        type: 'blob',
      },
      model: 'small', // Use small model for faster processing (was 'medium')
      device: 'cpu', // Force CPU mode (no GPU/WebGL)
      // CRITICAL: Force single-threaded mode to avoid WASM cross-origin isolation errors
      // @ts-ignore - numThreads might not be in types but is supported
      numThreads: 1,
      // HIGH QUALITY EDGE HANDLING
      // Preserve hair, face, and shoulder details
      // Minimal feathering (≤ 1px)
      progress: (key, current, total) => {
        if (key === 'compute:inference') {
          const progress = (current / total) * 100;
          console.log(`Processing: ${progress.toFixed(0)}%`);
        }
      },
    });
    
    const blob = await Promise.race([removalPromise, timeoutPromise]);
    
    console.log('✓ Background removed successfully!');
    console.log('Result blob:', {
      type: blob.type,
      size: blob.size,
    });

    // Convert blob back to File
    const processedFile = new File(
      [blob], 
      file.name.replace(/\.\w+$/, '.png'), 
      {
        type: 'image/png',
        lastModified: Date.now(),
      }
    );

    console.log('✓ File created:', processedFile.name);
    console.log('=== Background Removal Complete ===');
    return processedFile;
    
  } catch (error) {
    console.error('❌ Background Removal Failed');
    console.error('Error:', error);
    
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    
    // DO NOT return original file - throw error instead
    throw new Error(`Background removal failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}