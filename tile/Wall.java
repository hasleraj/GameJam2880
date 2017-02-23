package pencoding.sidescroller.tile;

import java.awt.Color;
import java.awt.Graphics;

import pencoding.sidescroller.main.Controller;
import pencoding.sidescroller.main.Game;
import pencoding.sidescroller.main.Id;

public class Wall extends Tile{

	public Wall(int x, int y, int width, int height, boolean solid, Id id,
			Controller controller) {
		super(x, y, width, height, solid, id, controller);
		
	}

	@Override
	public void render(Graphics g) {
		g.setColor(Color.RED);
		g.fillRect(x, y, width, height);
		//g.drawImage(Game.grass.getBufferedImage(), x, y, width, height, null);
	}

	@Override
	public void tick() {
		
		
	}
	
}
