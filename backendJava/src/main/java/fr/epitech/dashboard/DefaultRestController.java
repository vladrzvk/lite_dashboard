package fr.epitech.dashboard;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class DefaultRestController {
	
	private static final Logger logger = LoggerFactory.getLogger(DefaultRestController.class);  
	
    @GetMapping("/")
    public ResponseEntity<String> pong() {
        logger.info("Service starting OK .....");
        return new ResponseEntity<String>("Server answer: "+HttpStatus.OK.name(), HttpStatus.OK);
    }
    
    @GetMapping("/about.json")
    public ResponseEntity<Resource> getA() throws IOException {
    	File file = new File("src/main/resources/files/about.json");
    	
    	InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
    	
    	HttpHeaders header = new HttpHeaders();
    	header.add(HttpHeaders.CONTENT_DISPOSITION, "attachement; filename=about.json");
    	header.add("Cache-Control", "no-cache, no-store, must-revalidate");
    	header.add("Pragma", "no-cache");
    	header.add("Expires", "0");
    	
    	return ResponseEntity.ok().headers(header)
    			.contentLength(file.length())
    			.contentType(MediaType.parseMediaType("application/octet-stream"))
    			.body(resource);
    }
    
    
}
