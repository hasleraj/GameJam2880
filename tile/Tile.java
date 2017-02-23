package pencoding.sidescroller.tile;

import java.awt.Graphics;
import java.awt.Rectangle;

import pencoding.sidescroller.main.Controller;
import pencoding.sidescroller.main.Id;

public abstract class Tile {

	public int x, y;
	public int width, height;
	public int velX, velY;
	

	public boolean solid;
	
	public Id id;
	
	public Controller controller;
	
	public Tile(int x, int y, int width, int height, boolean solid, Id id, Controller controller){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.solid = solid;
		this.id = id;
		this.controller = controller;
	}
	
	public abstract void render(Graphics g);
	public abstract void tick(); 

	public void die(){
		controller.removeTile(this);
	}
	
	public Rectangle getBounds(){
		return new Rectangle(getX(),getY(),width,height);
	}
	
	// --------------------------- Getters and Setters
	
	public Id getId(){
		return id;
	}
	
	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getVelX() {
		return velX;
	}

	public void setVelX(int velX) {
		this.velX = velX;
	}

	public int getVelY() {
		return velY;
	}

	public void setVelY(int velY) {
		this.velY = velY;
	}
	
	public boolean isSolid() {
		return solid;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public void setSolid(boolean solid) {
		this.solid = solid;
	}
	
	//--------------------------------------------------
	
}
